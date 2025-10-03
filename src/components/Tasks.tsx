import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import AddTaskDialogue from "./AddTaskDialogue";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

type Task = {
  id: string;
  title: string;
  description: string;
  time: "morning" | "afternoon" | "evening";
  status: "pending" | "in_progress" | "completed";
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");

      const tasks = await response.json();

      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks.filter((task) => task.time === "evening");

  const handleTaskDeleteClick = async (taskId: string) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      );
    }
    console.log(response);

    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks as Task[]);
    toast.success("Tarefa removida com sucesso");
  };

  const handleTaskCheckboxClick = (taskId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;

      if (task.status === "pending") {
        toast.success("Tarefa iniciada com sucesso!");
        return { ...task, status: "in_progress" };
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso!");
        return { ...task, status: "completed" };
      }
      if (task.status === "completed") {
        toast("Tarefa reiniciada.");
        return { ...task, status: "pending" };
      }

      return task;
    });
    setTasks(newTasks as Task[]);
  };

  const handleAddTaskSubmit = async (task: {
    title: string;
    description: string;
    time: "morning" | "afternoon" | "evening";
  }) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      status: "pending",
      ...task,
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar a tarefa. Por favor, tente novamente."
      );
    }

    setTasks([...tasks, newTask]);
    toast.success("Tarefa adicionada com sucesso!");
    setAddTaskDialogIsOpen(false);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            <TrashIcon />
            Limpar tarefas
          </Button>
          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon />
            Nova tarefa
          </Button>

          <AddTaskDialogue
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
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
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks?.filter((task: Task) => task.time === "morning");
  const afternoonTasks = tasks?.filter(
    (task: Task) => task.time === "afternoon"
  );
  const eveningTasks = tasks?.filter((task: Task) => task.time === "evening");

  const handleTaskCheckboxClick = (taskId: string) => {
    const newTasks = tasks?.map((task: Task) => {
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
    queryClient.setQueryData(["tasks"], newTasks);
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
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhuma tarefa para mostrar no periodo da manhã.
            </p>
          )}
          {morningTasks?.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhuma tarefa para mostrar no periodo da tarde.
            </p>
          )}
          {afternoonTasks?.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhuma tarefa para mostrar no periodo da noite.
            </p>
          )}
          {eveningTasks?.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

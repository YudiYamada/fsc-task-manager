import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import Header from "./Header";
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
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task: Task) => task.time === "morning");
  const afternoonTasks = tasks?.filter(
    (task: Task) => task.time === "afternoon"
  );
  const eveningTasks = tasks?.filter((task: Task) => task.time === "evening");

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header title="Minhas Terefas" subtitle="Minhas Terefas" />

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhuma tarefa para mostrar no periodo da manhã.
            </p>
          )}
          {morningTasks?.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

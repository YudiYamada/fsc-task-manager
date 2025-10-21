import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import DashboardCard from "./DashboardCard";

type DataProps = {
  id: string;
  title: string;
  time: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
};

const DashboardCards = () => {
  const { data: tasks } = useGetTasks();
  const completedTasks = tasks?.filter(
    (task: DataProps) => task.status === "completed"
  ).length;
  const inProgressTasks = tasks?.filter(
    (task: DataProps) => task.status === "in_progress"
  ).length;
  const pendingTasks = tasks?.filter(
    (task: DataProps) => task.status === "pending"
  ).length;
  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="Tarefas totais"
      />
      <DashboardCard
        icon={<GlassWaterIcon />}
        mainText={pendingTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderIcon className="animate-spin" />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  );
};

export default DashboardCards;

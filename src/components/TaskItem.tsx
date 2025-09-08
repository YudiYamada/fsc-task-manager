type TaskProps = {
  task: {
    id: number;
    title: string;
    status: "pending" | "in_progress" | "completed";
  };
};

const TaskItem = ({ task }: TaskProps) => {
  const getStatusClasses = () => {
    if (task.status === "completed") {
      return "bg-[rgba(0,173,181,0.1)] text-[#00ADB5]";
    }

    if (task.status === "in_progress") {
      return "bg-[rgba(255,193,7,0.1)] text-[#FFC107]";
    }

    return "bg-[rgba(43,45,66,0.1)] text-[#2B2D42]";
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  );
};

export default TaskItem;

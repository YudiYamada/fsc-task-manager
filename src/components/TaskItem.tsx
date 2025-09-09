import CheckIcon from "../assets/icons/check.svg?react";
import LoadingIcon from "../assets/icons/loader.svg?react";
import DetailsIcon from "../assets/icons/details.svg?react";

type TaskProps = {
  task: {
    id: number;
    title: string;
    status: "pending" | "in_progress" | "completed";
  };
  icon?: React.ReactNode;
  handleTaskCheckboxClick: (id: number) => void;
};

const TaskItem = ({ task, handleTaskCheckboxClick }: TaskProps) => {
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
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <label
        className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
      >
        <input
          type="checkbox"
          checked={task.status === "completed"}
          className="absolute h-full w-full cursor-pointer opacity-0"
          onChange={() => handleTaskCheckboxClick(task.id)}
        />
        {task.status === "completed" && <CheckIcon />}
        {task.status === "in_progress" && (
          <LoadingIcon className="animate-spin" />
        )}
      </label>
      {task.title}
      <a href="#" className="ml-auto transition hover:opacity-70">
        <DetailsIcon />
      </a>
    </div>
  );
};

export default TaskItem;

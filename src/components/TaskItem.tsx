import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

type TaskProps = {
  task: {
    id: number;
    title: string;
    status: "pending" | "in_progress" | "completed";
  };
  icon?: React.ReactNode;
  handleTaskCheckboxClick: (id: number) => void;
  handleTaskDeleteClick: (id: number) => void;
};

const TaskItem = ({
  task,
  handleTaskCheckboxClick,
  handleTaskDeleteClick,
}: TaskProps) => {
  const getStatusClasses = () => {
    if (task.status === "completed") {
      return "bg-brand-primary/10 text-brand-primary";
    }

    if (task.status === "in_progress") {
      return "bg-brand-process/10 text-brand-process";
    }

    return "bg-brand-text-gray/10 text-brand-text-gray";
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
          <LoaderIcon className="animate-spin" />
        )}
      </label>
      {task.title}
      <div className="ml-auto flex items-center justify-center gap-2">
        <Button variant="ghost" onClick={() => handleTaskDeleteClick(task.id)}>
          <TrashIcon className="transition hover:opacity-70" />
        </Button>
        <a href="#">
          <DetailsIcon className="transition hover:opacity-70" />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;

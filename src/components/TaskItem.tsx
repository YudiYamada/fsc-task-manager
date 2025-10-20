import { Link } from "react-router-dom";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useUpdateTask } from "../hooks/data/use-upadate-task";
import Button from "./Button";

type TaskProps = {
  task: {
    id: string;
    title: string;
    status: "pending" | "in_progress" | "completed";
  };
  icon?: React.ReactNode;
};

const TaskItem = ({ task }: TaskProps) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);

  const { mutate: updateTask } = useUpdateTask(task.id);

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa. Tente novamente.");
      },
    });
  };

  const getStatusClasses = () => {
    if (task.status === "completed") {
      return "bg-brand-primary/10 text-brand-primary";
    }

    if (task.status === "in_progress") {
      return "bg-brand-process/10 text-brand-process";
    }

    return "bg-brand-text-gray/10 text-brand-text-gray";
  };

  const getNewStatus = () => {
    if (task.status === "pending") {
      return "in_progress";
    }

    if (task.status === "in_progress") {
      return "completed";
    }
    return "pending";
  };

  const handleCheckboxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () =>
          toast.success("Status da tarefa atualizado com sucesso!"),
        onError: () =>
          "Erro ao atualizar status da tarefa. Por favor, tente novamente",
      }
    );
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
          onChange={handleCheckboxClick}
        />
        {task.status === "completed" && <CheckIcon />}
        {task.status === "in_progress" && (
          <LoaderIcon className="animate-spin" />
        )}
      </label>
      {task.title}
      <div className="ml-auto flex items-center justify-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon className="transition hover:opacity-70" />
          )}
        </Button>
        <Link to={`task/${task.id}`}>
          <DetailsIcon className="transition hover:opacity-70" />
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

type TaskProps = {
  task: {
    id: string;
    title: string;
    status: "pending" | "in_progress" | "completed";
  };
  icon?: React.ReactNode;
  handleTaskCheckboxClick: (id: string) => void;
};

const TaskItem = ({ task, handleTaskCheckboxClick }: TaskProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteTask", task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      });
      return response.json();
    },
  });

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
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

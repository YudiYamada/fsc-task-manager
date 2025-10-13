import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ChevronRightIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { ArrowLeftIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

type DataProps = {
  id: string;
  title: string;
  time: string;
  description: string;
};

const TaskDetailsPage = () => {
  const queryClient = useQueryClient();
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<DataProps>({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });

  const { mutate: updateTask, isPending: updateTaskIsLoading } = useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data: DataProps) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time.trim(),
          description: data.description.trim(),
        }),
      });

      if (!response.ok) throw new Error();

      const updatedTask = await response.json();

      queryClient.setQueryData(
        ["tasks"],
        (oldTasks: DataProps[] | undefined) => {
          if (!oldTasks) return [];
          return oldTasks.map((task) =>
            task.id === taskId ? updatedTask : task
          );
        }
      );
    },
  });

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } = useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();

      const deletedTask = await response.json();

      queryClient.setQueryData(
        ["tasks"],
        (oldTasks: DataProps[] | undefined) => {
          if (!oldTasks) return [];
          return oldTasks.filter((task) => task.id !== deletedTask.id);
        }
      );
    },
  });

  const { data: task } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      reset(data);
      return data;
    },
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (data: DataProps) => {
    updateTask(data, {
      onSuccess: () => toast.success("Tarefa atualizada com sucesso!"),

      onError: () => toast.error("Ocorreu um erro ao atualizar a tarefa."),
    });
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
        navigate(-1);
      },
      onError: () => toast.error("Ocorreu um erro ao deletar a tarefa."),
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="bg-brand-primary mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link to={`/`} className="text-brand-text-gray cursor-pointer">
                Minhas Terefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={deleteTaskIsLoading}
          >
            {deleteTaskIsLoading && <LoaderIcon className="animate-spin" />}
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="bg-brand-white space-y-6 rounded-xl p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "O título é obrigatório.",
                  validate: (value) =>
                    value.trim() !== "" || "O título é obrigatório.",
                })}
                errorMessage={
                  typeof errors?.title?.message === "string"
                    ? errors.title.message
                    : undefined
                }
              />
            </div>

            <div>
              <TimeSelect
                id="time"
                {...register("time", {
                  required: "O horário é obrigatório.",
                  validate: (value) =>
                    value.trim() !== "" || "O horário é obrigatório.",
                })}
                errorMessage={
                  typeof errors?.time?.message === "string"
                    ? errors.time.message
                    : undefined
                }
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "A descrição é obrigatória.",
                  validate: (value) =>
                    value.trim() !== "" || "A descrição é obrigatória.",
                })}
                errorMessage={
                  typeof errors?.description?.message === "string"
                    ? errors.description.message
                    : undefined
                }
              />
            </div>

            <div className="flex w-full justify-end gap-3">
              <Button size="large" color="secondary" onClick={handleBackClick}>
                Cancelar
              </Button>
              <Button
                size="large"
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
                type="submit"
              >
                {updateTaskIsLoading && <LoaderIcon className="animate-spin" />}
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;

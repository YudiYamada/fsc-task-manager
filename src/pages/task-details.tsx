import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ChevronRightIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { ArrowLeftIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

type TaskProps = {
  title?: string;
  time?: string;
  description?: string;
};

type DataProps = {
  title: string;
  time: string;
  description: string;
};

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskProps | null>(null);
  const navigate = useNavigate();
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<DataProps>({
    defaultValues: {
      title: "",
      time: "",
      description: "",
    },
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();
      setTask(data);
      reset(data);
    };

    fetchTask();
  }, [taskId, reset]);

  const handleSaveClick = async (data: DataProps) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
      }),
    });

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao salvar a tarefa.");
    }

    const newTask = await response.json();
    setTask(newTask);
    handleBackClick();
  };

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return toast.error("Ocorreu um erro ao deletar a tarefa.");
    }

    setDeleteIsLoading(false);
    toast.success("Tarefa deletada com sucesso.");
    handleBackClick();
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
            disabled={deleteIsLoading}
          >
            {deleteIsLoading && <LoaderIcon className="animate-spin" />}
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
              <Button size="large" disabled={isSubmitting} type="submit">
                {isSubmitting && <LoaderIcon className="animate-spin" />}
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

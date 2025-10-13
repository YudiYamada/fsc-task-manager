import "./AddTaskDialogue.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { LoaderIcon } from "../assets/icons";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

type TimeOption = "morning" | "afternoon" | "evening";
type TaskStatus = "pending" | "in_progress" | "completed";

type Task = {
  id: string;
  title: string;
  time: TimeOption;
  description: string;
  status: TaskStatus;
};

type DataProps = {
  title: string;
  time: string;
  description: string;
};

interface AddTaskDialogueProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: ReactNode;
}

const AddTaskDialogue = ({
  isOpen,
  children,
  handleClose,
}: AddTaskDialogueProps) => {
  const nodeRef = useRef(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation<Task, Error, Task>({
    mutationKey: ["addTask"],
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa.");
      }

      return response.json();
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<DataProps>({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });

  const handleSaveClick = (data: DataProps) => {
    const task: Task = {
      id: uuidv4(),
      title: data.title.trim(),
      time: data.time as TimeOption,
      description: data.description.trim(),
      status: "pending",
    };

    mutate(task, {
      onSuccess: () => {
        queryClient.setQueryData<Task[]>(["tasks"], (currentTasks = []) => [
          ...currentTasks,
          task,
        ]);
        handleClose();
        reset({
          title: "",
          time: "morning",
          description: "",
        });
      },
      onError: () => toast.error("Erro ao adicionar tarefa."),
    });
  };

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    });
    handleClose();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow-lg">
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mt-1 mb-4 text-sm">
                Insira as informações abaixo
              </p>
              {children}

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={
                    typeof errors?.title?.message === "string"
                      ? errors.title.message
                      : undefined
                  }
                  disabled={isSubmitting}
                  {...register("title", {
                    required: "O título é obrigatório.",
                    validate: (value) =>
                      value.trim() !== "" || "O título é obrigatório.",
                  })}
                />

                <TimeSelect
                  id="time"
                  errorMessage={
                    typeof errors?.time?.message === "string"
                      ? errors.time.message
                      : undefined
                  }
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O horário é obrigatório.",
                    validate: (value) =>
                      value.trim() !== "" || "O horário é obrigatório.",
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={
                    typeof errors?.description?.message === "string"
                      ? errors.description.message
                      : undefined
                  }
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A descrição é obrigatória.",
                    validate: (value) =>
                      value.trim() !== "" || "A descrição é obrigatória.",
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    color="secondary"
                    size="large"
                    className="w-full"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialogue;

import "./AddTaskDialogue.css";

import type { ReactNode } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";

import { LoaderIcon } from "../assets/icons";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

type TimeOption = "morning" | "afternoon" | "evening";

type ErrorItem = {
  inputName: string;
  message: string;
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
  onSubmitSuccess: (task: {
    id: string;
    title: string;
    time: TimeOption;
    description: string;
  }) => void;
  onSubmitError?: (errors: ErrorItem[]) => void;
}

const AddTaskDialogue = ({
  isOpen,
  children,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}: AddTaskDialogueProps) => {
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

  const nodeRef = useRef(null);

  const handleSaveClick = async (data: DataProps) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    });

    if (!response.ok) {
      return onSubmitError?.([
        { inputName: "title", message: "Erro ao salvar a tarefa." },
      ]);
    }

    const { id } = await response.json();

    onSubmitSuccess({
      title: data.title.trim(),
      time: data.time as TimeOption,
      description: data.description.trim(),
      id,
    });
    handleClose();
    reset({
      title: "",
      time: "morning",
      description: "",
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

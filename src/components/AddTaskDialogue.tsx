import "./AddTaskDialogue.css";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [time, setTime] = useState<TimeOption>("morning");
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const nodeRef = useRef(null);
  const titleRef = useRef("" as unknown as HTMLInputElement);
  const timeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef("" as unknown as HTMLInputElement);

  useEffect(() => {
    if (!isOpen) {
      setTime("morning");
    }
  }, [isOpen]);

  const handleSaveClick = async () => {
    setIsLoading(true);
    const newErrors = [];

    const title = titleRef.current?.value || "";
    const time = timeRef.current?.value as TimeOption;
    const description = descriptionRef.current?.value || "";

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O período é obrigatório.",
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setIsLoading(false);
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify({ title, time, description }),
    });

    if (!response.ok) {
      setIsLoading(false);
      return onSubmitError?.(newErrors);
    }

    onSubmitSuccess({
      title,
      time,
      description,
      id: (await response.json()).id,
    });
    setIsLoading(false);
    handleClose();
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

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
            {/* DIALOG */}
            <div className="rounded-xl bg-white p-5 text-center shadow-lg">
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mt-1 mb-4 text-sm">
                Insira as informações abaixo
              </p>
              {children}

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da terefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={isLoading}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) =>
                    setTime(event.target.value as TimeOption)
                  }
                  errorMessage={timeError?.message}
                  disabled={isLoading}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.message}
                  disabled={isLoading}
                />

                <div className="flex gap-3">
                  <Button
                    color="secondary"
                    size="large"
                    className="w-full"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialogue;

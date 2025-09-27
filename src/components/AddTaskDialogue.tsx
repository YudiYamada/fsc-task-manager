import "./AddTaskDialogue.css";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

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
  handleSubmit: (task: {
    id: string;
    title: string;
    time: TimeOption;
    description: string;
  }) => void;
  children?: ReactNode;
}

const AddTaskDialogue = ({
  isOpen,
  children,
  handleClose,
  handleSubmit,
}: AddTaskDialogueProps) => {
  const [time, setTime] = useState<TimeOption>("morning");
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const nodeRef = useRef(null);
  const titleRef = useRef("" as unknown as HTMLInputElement);
  const descriptionRef = useRef("" as unknown as HTMLInputElement);

  useEffect(() => {
    if (!isOpen) {
      setTime("morning");
    }
  }, [isOpen]);

  const handleSaveClick = () => {
    const newErrors = [];

    const title = titleRef.current?.value || "";
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
      return;
    }

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
    });
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
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-[#9A9C9F]">
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
                />

                <TimeSelect
                  value={time}
                  onChange={(event) =>
                    setTime(event.target.value as TimeOption)
                  }
                  errorMessage={timeError?.message}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.message}
                />

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
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
                  >
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

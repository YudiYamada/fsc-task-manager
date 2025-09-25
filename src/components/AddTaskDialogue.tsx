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
  const [title, setTitle] = useState("");
  const [time, setTime] = useState<TimeOption>("morning");
  const [description, setDescription] = useState("");

  const nodeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setTime("morning");
      setDescription("");
    }
  }, [isOpen]);

  const handleSaveClick = () => {
    if (!title.trim() || !time.trim() || !description.trim()) {
      return alert("Por favor, preencha todos os campos.");
    }
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
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
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) =>
                    setTime(event.target.value as TimeOption)
                  }
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
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

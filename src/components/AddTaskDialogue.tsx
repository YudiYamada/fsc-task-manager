import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import Button from "./Button";
import Input from "./Input";
interface AddTaskDialogueProps {
  isOpen: boolean;
  handleClose?: () => void;
  children?: ReactNode;
}

const AddTaskDialogue = ({
  isOpen,
  children,
  handleClose,
}: AddTaskDialogueProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* DIALOG */}
      <div className="rounded-xl bg-white p-5 text-center shadow-lg">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 mb-4 text-sm text-[#9A9C9F]">
          Insira as informações abaixo
        </p>
        {children}

        <div className="flex w-[336px] flex-col space-y-4">
          <Input
            id="title"
            label="Título"
            placeholder="Insira o título da terefa"
          />
          <Input id="time" label="Horário" placeholder="Horário" />
          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
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
            <Button size="large" className="w-full">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskDialogue;

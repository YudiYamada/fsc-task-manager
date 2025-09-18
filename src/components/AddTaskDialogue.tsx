import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface AddTaskDialogueProps {
  isOpen: boolean;
  children?: ReactNode;
}

const AddTaskDialogue = ({ isOpen, children }: AddTaskDialogueProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* DIALOG */}
      <div className="rounded-xl bg-white p-5 text-center shadow-lg">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 text-sm text-[#9A9C9F]">
          Insira as informações abaixo
        </p>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default AddTaskDialogue;

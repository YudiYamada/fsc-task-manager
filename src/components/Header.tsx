import { useState } from "react";

import { AddIcon, TrashIcon } from "../assets/icons";
import AddTaskDialogue from "./AddTaskDialogue";
import Button from "./Button";

type HeaderProps = {
  title: string;
  subtitle: string;
};

const Header = ({ subtitle, title }: HeaderProps) => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-brand-primary text-xs font-semibold">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button color="ghost">
          <TrashIcon />
          Limpar tarefas
        </Button>
        <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
          <AddIcon />
          Nova tarefa
        </Button>

        <AddTaskDialogue
          isOpen={addTaskDialogIsOpen}
          handleClose={() => setAddTaskDialogIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default Header;

import { useEffect, useRef, useState } from "react";
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

type ErrorItem = {
  inputName: string;
  message: string;
};

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskProps | null>(null);
  const navigate = useNavigate();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const titleRef = useRef("" as unknown as HTMLInputElement);
  const timeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef("" as unknown as HTMLInputElement);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  const handleSaveClick = async () => {
    setSaveIsLoading(true);
    const newErrors = [];

    const title = titleRef.current?.value || "";
    const time = timeRef.current?.value || "";
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
      return setSaveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, time, description }),
    });

    if (!response.ok) {
      toast.error("Ocorreu um erro ao salvar a tarefa.");
      return setSaveIsLoading(false);
    }

    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
    // handleBackClick();
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

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

          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="bg-brand-white rounded-xl p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect
              id="time"
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary" onClick={handleBackClick}>
            Cancelar
          </Button>
          <Button
            size="large"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;

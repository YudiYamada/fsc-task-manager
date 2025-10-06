import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TaskProps = {
  title?: string;
  description?: string;
};

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskProps | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  return (
    <div>
      <h1>{task?.title}</h1>
      <p>{task?.description}</p>
    </div>
  );
};

export default TaskDetailsPage;

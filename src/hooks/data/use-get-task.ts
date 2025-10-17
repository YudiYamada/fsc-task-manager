import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type DataProps = {
  id: string;
  title: string;
  time: string;
  description: string;
};

export const useGetTask = (
  taskId: string,
  onSuccess: (task: DataProps) => void
) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data: task } = await axios.get(
        `http://localhost:3000/tasks/${taskId}`
      );

      onSuccess(task);
      return task;
    },
  });
};

import { useQuery } from "@tanstack/react-query";

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
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const task = await response.json();
      onSuccess(task);
      return task;
    },
  });
};

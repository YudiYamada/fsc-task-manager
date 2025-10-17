import { useQuery } from "@tanstack/react-query";

import { api } from "../../lib/axios";

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
      const { data: task } = await api.get<DataProps>(`/tasks/${taskId}`);
      onSuccess(task);
      return task;
    },
  });
};

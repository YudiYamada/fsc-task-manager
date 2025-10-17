import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

type DataProps = {
  id: string;
  title: string;
  time: string;
  description: string;
};

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data: DataProps) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
      });
      queryClient.setQueryData(
        taskQueryKeys.getAll(),
        (oldTasks: DataProps[] | undefined) => {
          return oldTasks?.map((task) => {
            if (task.id === taskId) {
              return updatedTask;
            }
            return task;
          });
        }
      );
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask);
    },
  });
};

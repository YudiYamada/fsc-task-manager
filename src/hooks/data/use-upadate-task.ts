import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
    mutationFn: async (newTask: DataProps) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: newTask.title.trim(),
          time: newTask.time.trim(),
          description: newTask.description.trim(),
        }
      );
      queryClient.setQueryData(
        ["tasks"],
        (oldTasks: DataProps[] | undefined) => {
          return oldTasks?.map((oldTasks) => {
            if (oldTasks.id === taskId) {
              return updatedTask;
            }
            return oldTasks;
          });
        }
      );
    },
  });
};

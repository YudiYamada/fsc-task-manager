import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
};

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`
      );
      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) => {
        if (!Array.isArray(oldTasks)) return [];
        return oldTasks.filter((task) => task.id !== deletedTask.id);
      });
    },
  });
};

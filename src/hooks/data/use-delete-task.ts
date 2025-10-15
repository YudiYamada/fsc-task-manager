import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      const deletedTask = await response.json();
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

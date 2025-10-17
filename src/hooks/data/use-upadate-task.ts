import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: newTask.title.trim(),
          time: newTask.time.trim(),
          description: newTask.description.trim(),
        }),
      });

      if (!response.ok) throw new Error();

      const updatedTask = await response.json();

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

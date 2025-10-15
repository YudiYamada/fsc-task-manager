import { useMutation, useQueryClient } from "@tanstack/react-query";

type TimeOption = "morning" | "afternoon" | "evening";
type TaskStatus = "pending" | "in_progress" | "completed";

type Task = {
  id: string;
  title: string;
  time: TimeOption;
  description: string;
  status: TaskStatus;
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, Task>({
    mutationKey: ["addTask"],
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa.");
      }

      const createdTask = await response.json();
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (currentTasks = []) => [
        ...currentTasks,
        createdTask,
      ]);
    },
  });
};

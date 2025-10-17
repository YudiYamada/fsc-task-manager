import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

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
      const { data: createdTask } = await api.post<Task>("/tasks", task);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(
        taskQueryKeys.getAll(),
        (currentTasks = []) => [...currentTasks, createdTask]
      );
    },
  });
};

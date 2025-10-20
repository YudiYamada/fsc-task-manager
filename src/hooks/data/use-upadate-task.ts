import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskMutationKeys } from "../../keys/mutations";
import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

type DataProps = {
  id: string;
  title: string;
  time: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
};

type PartialTaskUpdate = Partial<DataProps>;

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data: PartialTaskUpdate) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, data);

      queryClient.setQueryData(
        taskQueryKeys.getAll(),
        (oldTasks?: DataProps[]) =>
          oldTasks?.map((task) => (task.id === taskId ? updatedTask : task))
      );

      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask);
    },
  });
};

/*
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskMutationKeys } from "../../keys/mutations";
import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

type DataProps = {
  id: string;
  title: string;
  time: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
};

type UpdateData = {
  taskId: string;
  data: {
    title: string;
    time: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
  };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.update("dynamic"),
    mutationFn: async ({ taskId, data }: UpdateData) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, data);

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks?: DataProps[]) =>
        oldTasks?.map((task) => (task.id === taskId ? updatedTask : task))
      );

      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask);
    },
  });
};

*/

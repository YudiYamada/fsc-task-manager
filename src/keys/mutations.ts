export const taskMutationKeys = {
  add: () => ["add-task"],
  update: (taskId: string) => ["update-task", taskId],
  delete: (taskId: string) => ["delete-task", taskId],
};

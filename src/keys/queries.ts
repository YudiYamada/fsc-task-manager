export const taskQueryKeys = {
  getAll: () => ["tasks"],
  getOne: (taskId: string) => ["tasks", taskId],
};

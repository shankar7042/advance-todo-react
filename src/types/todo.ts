export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export type FilterTypes = "all" | "active" | "completed";

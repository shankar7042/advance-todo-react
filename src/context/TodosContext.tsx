import { createContext } from "react";
import { FilterTypes, ITodo } from "../types/todo";

interface ITodoContext {
  todos: ITodo[];
  filter: FilterTypes;
  itemsLeft: number;
  completedTodosLength: number;
  filteredTodos: ITodo[];
  setFilterType: (filter: FilterTypes) => void;
  addTodo: (text: string) => void;
  toggleAll: (checked: boolean) => void;
  toggleTodo: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => void;
  updateTodoText: (id: string, text: string) => void;
  clearCompleted: () => void;
}

export const TodoContext = createContext<ITodoContext>({
  todos: [],
  filter: "all",
  itemsLeft: 0,
  completedTodosLength: 0,
  filteredTodos: [],
  setFilterType: () => {},
  addTodo: () => {},
  toggleAll: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  updateTodoText: () => {},
  clearCompleted: () => {},
});

import { useContext } from "react";
import { TodoContext } from "../context/TodosContext";

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("To use context please wrap in TodoProvider");
  }
  return context;
}

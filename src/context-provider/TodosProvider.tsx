import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { TodoContext } from "../context/TodosContext";
import { useLocalstorage } from "../hooks/useLocalstorage";
import { FilterTypes, ITodo } from "../types/todo";
import { getRandomId } from "../utils";

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useLocalstorage<ITodo[]>("todos", []);
  const [filter, setFilter] = useState<FilterTypes>("all");

  const itemsLeft = useMemo(() => {
    return todos.reduce((acc, curr) => acc + (curr.completed ? 0 : 1), 0);
  }, [todos]);

  const completedTodosLength = todos.length - itemsLeft;

  const setFilterType = (filter: FilterTypes) => {
    setFilter(filter);
  };

  const addTodo = useCallback(
    (text: string) => {
      setTodos((prevTodos) => [
        { id: getRandomId(), text, completed: false },
        ...prevTodos,
      ]);
    },
    [setTodos]
  );

  const toggleAll = useCallback(
    (checked: boolean) => {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => ({ ...todo, completed: checked }));
      });
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string, checked: boolean) => {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: checked };
          }
          return todo;
        });
      });
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    },
    [setTodos]
  );

  const updateTodoText = useCallback(
    (id: string, text: string) => {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text };
          }
          return todo;
        });
      });
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => !todo.completed);
    });
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
    }
  }, [todos, filter]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        itemsLeft,
        completedTodosLength,
        filteredTodos,
        setFilterType,
        addTodo,
        toggleAll,
        toggleTodo,
        deleteTodo,
        updateTodoText,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

import { useState, useCallback, useMemo } from "react";
import { AddTodo, Header, TodoBottom, Todos } from "./components";
import { FilterTypes, ITodo } from "./types/todo";
import { getRandomId } from "./utils";
import { useLocalstorage } from "./hooks/useLocalstorage";

function App() {
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
    <main className="mt-5">
      <Header header="todos" />
      <div className="w-[40%] mx-auto mt-8 py-2 shadow-md border rounded-md">
        <AddTodo addTodo={addTodo} toggleAll={toggleAll} />
        {todos.length > 0 && (
          <>
            <Todos
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateTodoText={updateTodoText}
            />
            <TodoBottom
              itemsLeft={itemsLeft}
              completedTodosLength={completedTodosLength}
              filter={filter}
              setFilter={setFilterType}
              clearCompleted={clearCompleted}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default App;

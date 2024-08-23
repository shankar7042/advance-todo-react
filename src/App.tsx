import { AddTodo, Header, TodoBottom, Todos } from "./components";
import { selectTodos } from "./feature/todos/todoSlice";
import { useAppSelector } from "./redux/hooks";

function App() {
  const todos = useAppSelector(selectTodos);

  return (
    <main className="mt-5">
      <Header header="todos" />
      <div className="w-[40%] mx-auto mt-8 py-2 shadow-md border rounded-md">
        <AddTodo />
        {todos.length > 0 && (
          <>
            <Todos />
            <TodoBottom />
          </>
        )}
      </div>
    </main>
  );
}

export default App;

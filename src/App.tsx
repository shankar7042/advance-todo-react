import { AddTodo, Header, TodoBottom, Todos } from "./components";
import { useAppSelector } from "./redux/hooks";

function App() {
  const todos = useAppSelector((state) => state.todoState.todos);

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

import { useAppSelector } from "../redux/hooks";
import Todo from "./Todo";

const Todos = () => {
  const todos = useAppSelector((state) => state.todoState.todos);

  return (
    <div className="mb-2">
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;

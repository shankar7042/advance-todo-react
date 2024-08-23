import { useTodos } from "../hooks/useTodos";
import Todo from "./Todo";

const Todos = () => {
  const { filteredTodos } = useTodos();

  return (
    <div className="mb-2">
      <ul>
        {filteredTodos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;

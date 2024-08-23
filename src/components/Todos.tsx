import { selectFilteredTodos } from "../feature/todos/todoSlice";
import { useAppSelector } from "../redux/hooks";
import Todo from "./Todo";

const Todos = () => {
  const filteredTodos = useAppSelector(selectFilteredTodos);

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

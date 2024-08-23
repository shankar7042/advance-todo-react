import { ITodo } from "../types/todo";
import Todo from "./Todo";

interface TodosProps {
  todos: ITodo[];
  toggleTodo: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => void;
  updateTodoText: (id: string, text: string) => void;
}

const Todos = ({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodoText,
}: TodosProps) => {
  return (
    <div className="mb-2">
      <ul>
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodoText={updateTodoText}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todos;

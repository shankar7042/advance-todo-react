import classNames from "classnames";
import { ITodo } from "../types/todo";
import { useState } from "react";

interface TodoProps {
  todo: ITodo;
  toggleTodo: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => void;
  updateTodoText: (id: string, text: string) => void;
}

const Todo = ({ todo, toggleTodo, deleteTodo, updateTodoText }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    toggleTodo(todo.id, checked);
  };

  const handleClick = () => {
    deleteTodo(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      updateTodoText(todo.id, text);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setText(todo.text);
    }
  };

  const handleBlur = () => {
    if (text && text !== todo.text) {
      updateTodoText(todo.id, text);
    } else if (!text) {
      setText(todo.text);
    }
    setIsEditing(false);
  };

  return (
    <li
      className={classNames(
        "px-4 flex gap-2 items-center group border-y py-4 text-xl",
        {
          "border border-red-400": isEditing,
        }
      )}
      onDoubleClick={handleDoubleClick}
    >
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={todo.completed}
        onChange={handleToggle}
      />
      {!isEditing ? (
        <p
          className={classNames("flex-1", {
            "line-through text-gray-400 select-none": todo.completed,
          })}
        >
          {todo.text}
        </p>
      ) : (
        <input
          type="text"
          className="flex-1 outline-none bg-inherit select-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      )}
      <button className="invisible group-hover:visible" onClick={handleClick}>
        X
      </button>
    </li>
  );
};

export default Todo;

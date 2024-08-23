import { useState } from "react";

interface AddTodoProps {
  addTodo: (text: string) => void;
  toggleAll: (checked: boolean) => void;
}

const AddTodo = ({ addTodo, toggleAll }: AddTodoProps) => {
  const [text, setText] = useState("");

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!text) return;

    if (e.key === "Enter") {
      addTodo(text);
      setText("");
    } else if (e.key === "Escape") {
      setText("");
    }
  };

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleAll(e.target.checked);
  };

  return (
    <div>
      <div className="flex p-4">
        <input
          type="checkbox"
          name="toggle-all"
          id="toggle-all"
          onChange={handleToggleAll}
        />
        <input
          type="text"
          placeholder="What needs to be done?"
          className="flex-1 outline-none text-xl px-4 bg-inherit"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={handleKeyUp}
          autoFocus
        />
      </div>
    </div>
  );
};

export default AddTodo;

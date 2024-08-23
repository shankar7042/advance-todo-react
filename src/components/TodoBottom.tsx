import classNames from "classnames";
import { FilterTypes } from "../types/todo";
import { capitalize } from "../utils";
import { useTodos } from "../hooks/useTodos";

const TodoBottom = () => {
  const {
    itemsLeft,
    completedTodosLength,
    filter,
    setFilterType: setFilter,
    clearCompleted,
  } = useTodos();

  const filterBtns: FilterTypes[] = ["all", "active", "completed"];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = (e.target as HTMLButtonElement).name as FilterTypes;
    setFilter(name);
  };

  const handleClear = () => {
    clearCompleted();
  };

  return (
    <div className="flex justify-between px-4 text-sm">
      <p>{itemsLeft} items left!</p>
      <div className="flex gap-2">
        {filterBtns.map((filterTxt) => (
          <button
            key={filterTxt}
            name={filterTxt}
            className={classNames(
              "px-2 py-1 hover:outline hover:outline-1 hover:outline-red-500",
              {
                "outline outline-1 outline-red-500": filter === filterTxt,
              }
            )}
            onClick={handleClick}
          >
            {capitalize(filterTxt)}
          </button>
        ))}
      </div>
      <button
        className={classNames("hover:underline", {
          invisible: completedTodosLength === 0,
          visible: completedTodosLength,
        })}
        onClick={handleClear}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoBottom;

import classNames from "classnames";
import {
  clearCompleted,
  selectCompletedTodosLength,
  selectFilter,
  selectItemsLeft,
  setFilter,
} from "../feature/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FilterTypes } from "../types/todo";
import { capitalize } from "../utils";

const TodoBottom = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const itemsLeft = useAppSelector(selectItemsLeft);
  const completedTodosLength = useAppSelector(selectCompletedTodosLength);

  const filterBtns: FilterTypes[] = ["all", "active", "completed"];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = (e.target as HTMLButtonElement).name as FilterTypes;
    dispatch(setFilter({ filter: name }));
  };

  const handleClear = () => {
    dispatch(clearCompleted());
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

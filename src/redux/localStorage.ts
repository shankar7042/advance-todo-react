import { initialState, TodoState } from "../feature/todos/todoSlice";

export const loadState = (): { todoState: TodoState } => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return { todoState: initialState };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("err", err);
    return { todoState: initialState };
  }
};

export const saveState = (state: { todoState: TodoState }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle write errors
    console.log("err", err);
  }
};

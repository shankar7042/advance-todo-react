import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todos/todoSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    todoState: todoReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveState(store.getState());
});

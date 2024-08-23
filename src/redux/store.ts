import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todos/todoSlice";

export const store = configureStore({
  reducer: {
    todoState: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../types/todo";
import { getRandomId } from "../../utils";

interface TodoState {
  todos: ITodo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: getRandomId(),
        text: action.payload,
        completed: false,
      });
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;

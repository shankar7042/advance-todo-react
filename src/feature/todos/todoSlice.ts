import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterTypes, ITodo } from "../../types/todo";
import { getRandomId } from "../../utils";
import { RootState } from "../../redux/store";

export interface TodoState {
  todos: ITodo[];
  filter: FilterTypes;
}

export const initialState: TodoState = {
  todos: [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      state.todos.push({
        id: getRandomId(),
        text: action.payload.text,
        completed: false,
      });
    },
    toggleAll: (state, action: PayloadAction<{ checked: boolean }>) => {
      state.todos.forEach((todo) => {
        todo.completed = action.payload.checked;
      });
    },
    toggleTodo: (
      state,
      action: PayloadAction<{ id: string; checked: boolean }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index === -1) return;
      state.todos[index].completed = action.payload.checked;
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index === -1) return;
      state.todos.splice(index, 1);
    },
    updateTodoText: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index === -1) return;
      state.todos[index].text = action.payload.text;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    setFilter: (state, action: PayloadAction<{ filter: FilterTypes }>) => {
      state.filter = action.payload.filter;
    },
  },
});

export const selectTodos = (state: RootState) => state.todoState.todos;
export const selectFilter = (state: RootState) => state.todoState.filter;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
);
export const selectItemsLeft = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => !todo.completed).length
);

export const selectCompletedTodosLength = createSelector(
  [selectTodos, selectItemsLeft],
  (todos, itemsLeft) => todos.length - itemsLeft
);

export const {
  addTodo,
  toggleAll,
  toggleTodo,
  deleteTodo,
  updateTodoText,
  clearCompleted,
  setFilter,
} = todoSlice.actions;
export default todoSlice.reducer;

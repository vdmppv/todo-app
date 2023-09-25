import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo from '../models/Todo';

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [
    {
      id: 1,
      description: 'Learn React',
      date: '18/08/2023',
    },
    {
      id: 2,
      description: 'Learn TypeScript',
      date: '21/09/2023',
    },
    {
      id: 3,
      description: 'Learn Ant Design',
      date: '22/09/2023',
    },
    {
      id: 4,
      description: 'Learn Redux',
      date: '24/09/2023',
    }
  ],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number[]>) => {
      state.todos = state.todos.filter(todo => !action.payload.includes(todo.id));
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const { id, description, date } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.description = description;
        existingTodo.date = date;
      }
    }
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;

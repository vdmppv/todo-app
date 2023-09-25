import React, {useState} from 'react';
import { List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, editTodo } from '../slices/todoSlice';
import Todo from '../models/Todo';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const todos = useSelector((state: {todo: {todos: Todo[]}}) => state.todo.todos);
  const dispatch = useDispatch();

  const handleRemove = (id: number[]) => {
    dispatch(removeTodo(id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleSaveEdit = (editedTodo: Todo) => {
    dispatch(editTodo(editedTodo));
    setEditingTodo(null);
  };

  return (
    <List
      dataSource={todos}
      renderItem={(item: Todo) => (
        <List.Item
          key={item.id}
          actions={(!editingTodo || editingTodo.id !== item.id) ? [
            <Button key={item.id} onClick={() => handleEdit(item)}>Edit</Button>,
            <Button key={item.id} onClick={() => handleRemove([item.id])}>Remove</Button>,
          ] : []}
        >
          {editingTodo && editingTodo.id === item.id ? (
            <TodoForm todo={item} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
          ) : (
            <>
              <List.Item.Meta title={item.description} description={item.date} style={{marginLeft: 20}} />
            </>
          )}
        </List.Item>
      )}
    />
  );
};

export default TodoList;

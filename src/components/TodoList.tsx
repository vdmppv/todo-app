import React, {useState} from 'react';
import { List, Button, Badge, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo } from '../slices/todoSlice';
import Todo from '../models/Todo';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const todos = useSelector((state: {todo: {todos: Todo[]}}) => state.todo.todos);
  const dispatch = useDispatch();

  const handleRemove = (id: number[]) => {
    dispatch(removeTodo(id));
    setSelectedItems([]);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleSaveEdit = (editedTodo: Todo) => {
    dispatch(updateTodo(editedTodo));
    setEditingTodo(null);
  };

  const handleTodoToggle = (id: number) => {
    setSelectedItems((prevSelected) => {
      const index = prevSelected.indexOf(id);
      if (index !== -1) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <List
      dataSource={todos}
      header={
        selectedItems.length ? 
          <Button onClick={handleRemove.bind(this, selectedItems)}>
            Delete selected <Badge count={selectedItems.length} />
          </Button>
        : null
      }
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
              <Checkbox checked={selectedItems.indexOf(item.id) !== -1} onChange={() => handleTodoToggle(item.id)} />
              <List.Item.Meta title={item.description} description={item.date} style={{marginLeft: 20}} />
            </>
          )}
        </List.Item>
      )}
    />
  );
};

export default TodoList;

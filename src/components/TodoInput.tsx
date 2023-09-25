import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Space, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slices/todoSlice';

const TodoInput: React.FC = () => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addTodo({ id: Date.now(), description, date: dayjs().format('DD/MM/YYYY') }));
    setDescription('');
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  return (
    <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
      <Space.Compact>
        <Input value={description} onChange={handleChangeText} placeholder="Add a new todo" />
        <Button type="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Space.Compact>
    </Space>
  );
};

export default TodoInput;

import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Form, Input, Button, DatePicker } from 'antd';

import Todo from '../models/Todo';

interface TodoFormProps {
  todo: Todo;
  onSave: (todo: Todo) => void;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSave, onCancel }) => {
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [date, setDate] = useState(todo ? dayjs(todo.date, 'DD/MM/YYYY') : dayjs());

  const handleSubmit = () => {
    const editedTodo: Todo = {
      id: todo ? todo.id : Date.now(),
      description,
      date: date.format('DD/MM/YYYY'),
    };
    
    onSave(editedTodo);
  };

  const handleChangeDate = (value: Dayjs | null) => {
    setDate(value ? value : dayjs());
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item>
        <Input
          value={description}
          onChange={handleChangeText}
        />
        <DatePicker value={date} format={'DD/MM/YYYY'} allowClear={false} onChange={handleChangeDate}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;

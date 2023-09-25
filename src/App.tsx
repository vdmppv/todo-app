import React from 'react';
import { Layout } from 'antd';
import TodoList from './components/TodoList';
import './App.css';
import TodoInput from './components/TodoInput';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header style={{ textAlign: 'center', color: '#fff' }}>Todo App</Header>
      <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
        <TodoInput />
        <TodoList />
      </Content>
    </Layout>
  );
};

export default App;

import React, { useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useActions } from './hooks/useActions';

const App = () => {
  const { setAuth, setUser } = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuth(true);
      setUser({ username: localStorage.getItem('username') || '', password: '' })
    }
  });


  return (
    <Layout>
      <Navbar />
      <Content>
        <AppRouter />
      </Content>
    </Layout>
  );
}

export default App;

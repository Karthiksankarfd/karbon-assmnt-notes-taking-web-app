import React, { useContext, useEffect } from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import useAutoLogin from '../hooks/useAutoLogin';
import { AuthContext } from '../../contex/AuthContext';

const Index = () => {
  const { getToken } = useAutoLogin();
  const { IsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!IsLoggedIn) {
      getToken();
    }
  }, [IsLoggedIn]);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Index;

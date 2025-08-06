import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Profile = lazy(() => import("../components/Profile"));
const EditNote = lazy(() => import("../pages/EditNote"));
const AddNotesPage = lazy(() => import("../pages/AddNotesPage"));

import ProtectedRoute from '../components/ProtectedRoute';
import Index from '../components/UI/Index';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import NotesPage from '../pages/NotesPage';

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Index />}>
          <Route index element={<NotesPage />} />
          <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='addnotes' element={<ProtectedRoute><AddNotesPage /></ProtectedRoute>} />
          <Route path='editnote' element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

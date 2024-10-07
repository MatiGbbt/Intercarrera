import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Pet from './pages/Pet';
import PetActions from './pages/PetActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/register">Registro</Link>
        <Link to="/login">Logeo</Link>
        <Link to="/pet">Mascota</Link>
        <Link to="/pet-actions">Pet Actions</Link>
      </nav>
      <Routes>
      <Route path='/' element={<Navigate to="/login" />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/pet' element={<Pet />}/>
        <Route path="/pet-actions" element={<PetActions />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Pet from './pages/Pet';
import PetActions from './pages/PetActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Registro</Link>
        <Link to="/login">Logeo</Link>
        <Link to="/pet">Mascota</Link>
        <Link to="/pet-actions">Pet Actions</Link>
      </nav>
      <Routes>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/pet' component={Pet}/>
        <Route path="/pet-actions" component={PetActions} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

import React from 'react';
import { AuthProvider } from './components/Auth/AuthContext';
import { TodoProvider } from './components/TodoContext';
import TodoList from './components/TodoList';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PrivateRoute from './components/Auth/PrivateRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;

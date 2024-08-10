import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import { TodoProvider } from "./components/TodoContext";
import { ThemeProvider } from "./components/ThemeContext";
import Loading from "./components/Loading";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import CheckConnection from "./components/CheckConnection";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <CheckConnection>
    <ThemeProvider>
      <AuthProvider>
        <TodoProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/todos"
                element={
                  <PrivateRoute>
                    <TodoList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </TodoProvider>
      </AuthProvider>
    </ThemeProvider>
    </CheckConnection>

  );
}

export default App;

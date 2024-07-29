import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Routes>

    </Router>
  );
};

export default App;

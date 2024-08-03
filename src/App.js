

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './components/Auth/AuthContext';
// import { TodoProvider } from './components/TodoContext';
// import PrivateRoute from './components/Auth/PrivateRoute';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import Navbar from './components/Navbar';
// import TodoList from './components/TodoList';
// import './App.css';

// function App() {
//   return (
//     <AuthProvider>
//       <TodoProvider>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/todos" element={<PrivateRoute><TodoList /></PrivateRoute>} />
//           </Routes>
//         </Router>
//       </TodoProvider>
//     </AuthProvider>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import { TodoProvider } from './components/TodoContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todos" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;

// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           To-Do List App
//         </Typography>
//         <Button color="inherit" component={Link} to="/">
//           Home
//         </Button>
//         <Button color="inherit" component={Link} to="/todos">
//           Todos
//         </Button>
//         <Button color="inherit" component={Link} to="/login">
//           Login
//         </Button>
//         <Button color="inherit" component={Link} to="/signup">
//           Sign Up
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo List App
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        {currentUser && (
          <Button component={Link} to="/todos" color="inherit">
            Todos
          </Button>
        )}
        {currentUser ? (
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

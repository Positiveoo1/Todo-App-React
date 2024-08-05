import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import { AppBar, Toolbar, Typography, Button, useMediaQuery, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SignupIcon from '@mui/icons-material/PersonAdd';

import './Navbar.css'
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [value, setValue] = useState(location.pathname);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };
  const navigate = useNavigate();
  const navigatedH = () => navigate("/");

  return (
    <>
      {!isMobile ? (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={navigatedH} style={{cursor: 'pointer'}}>
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
      ) : (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            value="/"
            icon={<HomeIcon />}
            component={Link}
            to="/"
          />
          {currentUser && (
            <BottomNavigationAction
              label="Todos"
              value="/todos"
              icon={<ListIcon />}
              component={Link}
              to="/todos"
            />
          )}
          {!currentUser && (
            <>
              <BottomNavigationAction
                label="Login"
                value="/login"
                icon={<LoginIcon />}
                component={Link}
                to="/login"
              />
              <BottomNavigationAction
                label="Sign Up"
                value="/signup"
                icon={<SignupIcon />}
                component={Link}
                to="/signup"
              />
            </>
          )}
          {currentUser && (
            <BottomNavigationAction
              label="Logout"
              value="/logout"
              icon={<LogoutIcon />}
              onClick={handleLogout}
            />
          )}
        </BottomNavigation>
      )}
    </>
  );
};

export default Navbar;


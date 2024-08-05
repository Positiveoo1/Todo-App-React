import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const { message } = location.state || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from.pathname || "/");
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signupPage = () => navigate("/signup");

  return (
    <Container>
      <h2>Login</h2>
      {message && (
        <Typography color="error" variant="body1">
          {message}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack direction={"row"} spacing={2}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Button variant="text" color="info" onClick={signupPage}>
            Sign Up?
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;

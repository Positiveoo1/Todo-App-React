import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the To-Do List App
      </Typography>
      <Typography variant="body1">
        Please sign up or log in to manage your tasks.
      </Typography>
    </Container>
  );
};

export default Home;

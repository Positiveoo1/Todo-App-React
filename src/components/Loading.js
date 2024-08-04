// src/components/Loading.js
import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import './Loading.css';

const Loading = () => {
  return (
    <Box className="loading-container">
      <CircularProgress className="loading-circle" size={100} thickness={4.5} />
      <BoltIcon className="loading-icon" fontSize="large" />
    </Box>
  );
};

export default Loading;

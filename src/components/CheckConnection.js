import React from 'react';
import { Detector } from 'react-detect-offline';
import { Box, Typography, Container } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';

const CheckConnection = (props) => {
  return (
    <Detector
      render={({ online }) =>
        online ? (
          props.children
        ) : (
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              flexDirection="column"
              textAlign="center"
              bgcolor="background.default"
              color="text.primary"
            >
              <WifiOffIcon style={{ fontSize: 80, color: 'dodgerblue' }} />
              <Typography variant="h4" gutterBottom>
                No Internet Connection
              </Typography>
              <Typography variant="body1">
                It seems that you are offline. Please check your internet connection and try again.
              </Typography>
            </Box>
          </Container>
        )
      }
    />
  );
};

export default CheckConnection;

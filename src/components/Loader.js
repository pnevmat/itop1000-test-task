import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default function Loader() {
  return (
    <LoaderContainer>
      <CircularProgress size={100} thickness={4} value={100} />
    </LoaderContainer>
  );
}

const LoaderContainer = styled(Box)({
  '&.MuiBox-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
});

import React from 'react';
import AppBar from './navigation/AppBar';
import Container from '@material-ui/core/Container';

export default ({ children }) => {
  return (
    <div>
      <Container maxWidth="xl">
        <AppBar />
        {children}
      </Container>
    </div>
  );
};

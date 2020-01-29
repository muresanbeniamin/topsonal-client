import React from 'react';
import AppBar from './navigation/AppBar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));

export default ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="xl" className={classes.container}>
        <AppBar />
        {children}
      </Container>
    </div>
  );
};

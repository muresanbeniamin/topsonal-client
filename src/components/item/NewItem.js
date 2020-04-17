import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import requireAuth from '../auth/requireAuth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({

}));

const item = function NewItem() {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Add new item
          </Typography>
          <Button autoFocus color="secondary" variant="contained">
            Add Item
          </Button>
        </Toolbar>
      </AppBar>
      <p>fwefwef</p>
    </div>
  );
}

export default (requireAuth(item));

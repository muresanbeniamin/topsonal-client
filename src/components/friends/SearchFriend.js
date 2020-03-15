import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { getusers } from '../../actions';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  rightAligned: {
    marginLeft: 'auto',
  },
  fontSize: {
    fontSize: 14
  },
  listText: {
    paddingLeft: 10
  },
  listDescription: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  listItem: {
    maxWidth: '70%',
    marginLeft: '15%',
    marginRight: '15%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: theme.spacing(2)
  },
  avatar: {
    display: 'flex-inline',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  addFriendButton: {
    marginTop: 5
  },
  addFriendIcon: {
    marginTop: 10
  }
}));

export default function SearchFriend(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  const [open, setOpen] = React.useState(false);
  let filteredUsers = useSelector(state => state.users.users);

  const handleOpenSearchFriendModal = () => {
    setOpen(true);
  };
  const handleCloseSearchFriendModal = () => {
    setOpen(false);
  };
  const searchFriendChanged = value => {
    if (value) {
      dispatch(getusers(authToken, value));
    }
  };

  return (
    <div style={{ maxWidth: '200px', marginTop: '10px', marginRight: 'auto', marginLeft: 'auto' }}>
      <Button variant="contained" color="primary" onClick={handleOpenSearchFriendModal} endIcon={<AddCircleOutlineIcon />}>
        Add New Friends
      </Button>
      <Dialog fullScreen open={open} onClose={handleCloseSearchFriendModal} maxWidth='xs'>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <PersonAddIcon/>
            <Typography variant="h6" className={classes.title}>
              Add New Friends 
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleCloseSearchFriendModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField fullWidth label="Search friends by name..." autoFocus onChange={e => searchFriendChanged(e.target.value)} />
          {filteredUsers.map((user, index) => (
            <Grid key={`${index}-friend`} container direction="row">
              <Grid item sm={1} xs={2}>
                <div className={classes.avatar}>
                  <Avatar>{user.full_name[0]}</Avatar>
                </div>
              </Grid>
              <Grid item sm xs={10}>
                <Typography className={classes.heading}>{user.full_name}</Typography>
              </Grid>
              <Grid item sm xs={12}>
                <Typography className={classes.heading}>{user.email}</Typography>
              </Grid>
              <Grid item sm xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.addFriendButton}
                  startIcon={<PersonAddIcon />}
                >
                  Add Friend
                </Button>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
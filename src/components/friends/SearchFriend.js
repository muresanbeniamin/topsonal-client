import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { searchFriends, getprofile } from '../../actions';
import { friendRequest, acceptFriendRequest, unfriendRequest, withdrawFriendRequest } from '../../actions';
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
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  dialogContent: {
    textAlign: 'center'
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  rightAligned: {
    marginLeft: 'auto'
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
  useEffect(() => {
    function fetchProfile() {
      dispatch(getprofile(authToken));
    }
    fetchProfile();
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  const profile = useSelector(state => state.profile.profile);

  let friendsIds, friendRequestsIds, friendRequestingIds, blockingFriendsIds, allUsersIds;

  if (profile.id) {
    friendsIds = profile.friends.map(user => user.id);
    friendRequestsIds = profile.friend_requests.map(user => user.id);
    friendRequestingIds = profile.friend_requesting.map(user => user.id);
    blockingFriendsIds = profile.blocking_friends.map(user => user.id);
    allUsersIds = friendsIds.concat(friendRequestsIds).concat(friendRequestingIds).concat(blockingFriendsIds);
  }

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
      dispatch(searchFriends(authToken, value));
    }
  };

  const handleAddFriend = userId => event => {
    dispatch(friendRequest(authToken, userId));
  }

  const handleAcceptFriendRequest = userId => event => {
    dispatch(acceptFriendRequest(authToken, userId));
  }

  const handleUnfriendRequest = userId => event => {
    dispatch(unfriendRequest(authToken, userId));
  }

  const handleWithdrawFriendRequest = userId => event => {
    dispatch(withdrawFriendRequest(authToken, userId));
  }

  const handleUnblockFriend = userId => event => {
    
  }

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
        <DialogContent className={classes.dialogContent}>
          <TextField fullWidth label="Search friends by name..." autoFocus onChange={e => searchFriendChanged(e.target.value)} />
          {filteredUsers.map((user, index) => (
            <ExpansionPanelSummary key={user.id} expandIcon={<ExpandMoreIcon />}>
              <div className={classes.avatar}>
                <Avatar>{user.full_name.split(' ').map(name => name[0]).join('')}</Avatar>
              </div>
              <Grid container direction="row">
                <Grid item sm xs={12}>
                  <Typography className={classes.heading}>{user.full_name}</Typography>
                </Grid>
                <Grid item sm xs={12}>
                  <Typography className={classes.heading}>{user.email}</Typography>
                </Grid>
                <Grid item sm xs={12}>
                  {friendsIds.includes(user.id) && 
                    <Button variant="contained" color="secondary" className={classes.addFriendButton} startIcon={<PersonAddDisabledIcon />} onClick={handleUnfriendRequest(user.id)}>
                      Unfriend
                    </Button>
                  }
                  {friendRequestsIds.includes(user.id) && 
                    <Button variant="contained" color="secondary" className={classes.addFriendButton} startIcon={<PersonAddIcon />} onClick={handleAcceptFriendRequest(user.id)}>
                      Accept Friend Request
                    </Button>
                  }
                  {friendRequestingIds.includes(user.id) && 
                    <Button variant="contained" color="secondary" className={classes.addFriendButton} startIcon={<PersonAddDisabledIcon />} onClick={handleWithdrawFriendRequest(user.id)}>
                      Withdraw Request
                    </Button>
                  }
                  {blockingFriendsIds.includes(user.id) && 
                    <Button variant="contained" color="secondary" className={classes.addFriendButton} startIcon={<PersonAddDisabledIcon />} onClick={handleUnblockFriend(user.id)}>
                      Unblock
                    </Button>
                  }
                  {!allUsersIds.includes(user.id) && 
                    <Button variant="contained" color="secondary" className={classes.addFriendButton} startIcon={<PersonAddIcon />} onClick={handleAddFriend(user.id)}>
                      Add Friend
                    </Button>
                  }
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
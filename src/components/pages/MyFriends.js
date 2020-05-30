import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import SearchFriend from '../friends/SearchFriend';
import { useSelector, useDispatch } from "react-redux";
import { getprofile, acceptFriendRequest } from '../../actions';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
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
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  panels: {
    marginTop: '20px;'
  },
  searchFriendButton: {
    maxWidth: '200px',
    marginTop: '10px',
    marginRight: '0',
    marginLeft: 'auto'
  }
}));

export default function MyFriends() {
  const authToken = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchProfile() {
      dispatch(getprofile(authToken));
    }
    fetchProfile();
  }, []);
  const classes = useStyles();
  const profile = useSelector(state => state.profile.profile);
  const friends = profile.friends;
  const friendRequests = profile.friend_requests;

  const handleAcceptFriendRequest = userId => event => {
    dispatch(acceptFriendRequest(authToken, userId));
  }

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Friends
          </Typography>
          <div className={classes.searchFriendButton}>
            <SearchFriend/>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className={classes.container}>
        <div className={classes.root}>
          <div className={classes.panels}>
            {friendRequests && friendRequests.length > 0 && <h2>Friend requests({friendRequests.length})</h2>}
            {friendRequests && friendRequests.map((user) => (
              <ExpansionPanelSummary key={user.id} expandIcon={<ExpandMoreIcon />}>
                <div className={classes.avatar}>
                  <Avatar className={classes.orange}>{user.full_name.split(' ').map(name => name[0]).join('')}</Avatar>
                </div>
                <Grid className={classes.root} container justify="space-between" >
                  <Grid item xs={12} sm>
                    <Typography className={classes.heading}>{user.full_name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm>
                    <Typography className={classes.heading}>{user.email}</Typography>
                  </Grid>
                  <Grid item sm xs={12}>
                    <Button variant="contained" color="secondary" className={classes.addFriendButton} startIcon={<PersonAddIcon />} onClick={handleAcceptFriendRequest(user.id)}>
                      Accept Friend Request
                    </Button>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
            ))}
          </div>
          <div className={classes.panels}>
            {friends && friends.length > 0 && <h2>Your friends({friends.length})</h2>}
            {friends && friends.map((friend) => (
              <ExpansionPanelSummary key={friend.id} expandIcon={<ExpandMoreIcon />}>
                <div className={classes.avatar}>
                  <Avatar className={classes.orange}>{friend.full_name.split(' ').map(name => name[0]).join('')}</Avatar>
                </div>
                <Grid className={classes.root} container justify="space-between" >
                  <Grid item sm xs={12}>
                    <Typography className={classes.heading}>{friend.full_name}</Typography>
                  </Grid>
                  <Grid item sm xs={12}>
                    <Typography className={classes.heading}>{friend.email}</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import requireAuth from '../auth/requireAuth';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { getDashboard } from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchFriend from '../friends/SearchFriend';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5)
  },
  card: {
    width: 345,
    height: 280
  },
  media: {
    height: 0,
    marginLeft: '15px',
    marginRight: '15px',
    paddingTop: '56.25%',
    cursor: 'pointer'
  },
  rightAlignedButton: {
    marginLeft: 'auto',
    fontSize: 14
  },
  centerText: {
    textAlign: 'center'
  },
  likeIcon: {
    paddingRight: 4
  },
  inline: {
    display: 'flex'
  }
}));

const dashboard = function Dashboard() {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  useEffect(() => {
    function fetchDashboard() {
      dispatch(getDashboard(authToken));
    }
    fetchDashboard();
  }, []);

  const dashboardLists = useSelector(state => state.dashboard.dashboard.friend_lists);
  const numberOfFriends = useSelector(state => state.dashboard.dashboard.number_of_friends);
  const classes = useStyles();
  const history = useHistory();

  const handleClickOpen = listId => event => {
    history.push(`lists/${listId}`);
  };
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Collections of your friends
          </Typography>
        </Toolbar>
      </AppBar>
      {!numberOfFriends && numberOfFriends === 0 && 
        <div className={classes.centerText}>
          <h2>You don't seem to have any friends, let's add some: </h2> 
          <SearchFriend/>
        </div>
      }
      {numberOfFriends !== 0 && dashboardLists.length === 0 &&
        <div className={classes.centerText}>
          <h2>Your friends don't have anything posted yet. Add more friends: </h2> 
          <SearchFriend/>
        </div>
      }
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {dashboardLists && dashboardLists.map((list) => (
              <Grid key={`${list.id}-list`} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        {list.user_full_name.split(' ').map(name => name[0]).join('')}
                      </Avatar>
                    }
                    action={
                      <PopupState variant="popover">
                        {popupState => (
                          <React.Fragment>
                            <IconButton variant="contained" color="primary" {...bindTrigger(popupState)}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem>Follow</MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    }
                    title={list.name}
                    subheader={list.created_date}
                  />
                  <div onClick={handleClickOpen(list.friendly_id)}>
                    <CardMedia
                      className={classes.media}
                      image={list.image_url}
                      title={list.name}
                    />
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default (requireAuth(dashboard));

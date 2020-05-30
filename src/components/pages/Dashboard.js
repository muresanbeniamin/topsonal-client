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
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: 345,
    height: 280
  },
  title: {
    flex: 1,
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

  const friendLists = useSelector(state => state.dashboard.dashboard.friend_lists);
  const dashboardPublicLists = useSelector(state => state.dashboard.dashboardPublicLists);
  const numberOfFriends = useSelector(state => state.dashboard.dashboard.number_of_friends);
  const loading = useSelector(state => state.loading.loading);
  const classes = useStyles();
  const history = useHistory();

  const handleClickOpen = listId => event => {
    history.push(`lists/${listId}`);
  };

  const handleAddList = event => {
    history.push('/new-list');
  };
  
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button className={classes.newListButton} autoFocus color="secondary" variant="contained" onClick={handleAddList}>
            New List
          </Button>
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress color="secondary" />}
      <Container maxWidth="xl">
        {!loading &&
          <div>
            {!numberOfFriends && numberOfFriends === 0 && 
              <div className={classes.centerText}>
                <h3>You don't seem to have any friends, let's add some: </h3> 
                <SearchFriend/>
              </div>
            }
            {numberOfFriends !== 0 && friendLists.length === 0 &&
              <div className={classes.centerText}>
                <h3>Your friends don't have anything posted yet. Add more friends: </h3> 
                <SearchFriend/>
              </div>
            }
            <Typography variant="h6" className={classes.centerText}>
              Friends Lists
            </Typography>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {friendLists && friendLists.map((list) => (
                    <Grid key={`${list.id}-list`} item>
                      <Card className={classes.card}>
                        <CardHeader
                          avatar={
                            <Tooltip title={list.user_full_name} placement="top-start">
                              <Avatar alt={list.user_full_name} aria-label="recipe">
                                {list.user_full_name.split(' ').map(name => name[0]).join('')}
                              </Avatar>
                            </Tooltip>
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
            <Typography variant="h6" className={classes.centerText}>
              Latest Public Lists
            </Typography>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {dashboardPublicLists && dashboardPublicLists.map((list) => (
                    <Grid key={`${list.id}-list`} item>
                      <Card className={classes.card}>
                        <CardHeader
                          avatar={
                            <Tooltip title={list.user_full_name} placement="top-start">
                              <Avatar alt={list.user_full_name} aria-label="recipe">
                                {list.user_full_name.split(' ').map(name => name[0]).join('')}
                              </Avatar>
                            </Tooltip>
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
        }
      </Container>
    </div>
  );
}

export default (requireAuth(dashboard));

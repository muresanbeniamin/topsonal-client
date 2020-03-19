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
import { getprofile } from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    textAlign: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: theme.spacing(2)
  },
  avatar: {
    display: 'flex',
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  panels: {
    marginTop: '20px;'
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

  return (
    <div className={classes.root}>
      <SearchFriend/>
      <div className={classes.panels}>
      {friends && friends.map((friend) => (
        <ExpansionPanelSummary key={friend.id} expandIcon={<ExpandMoreIcon />}>
          <div className={classes.avatar}>
            <Avatar className={classes.orange}>{friend.full_name.split(' ').map(name => name[0]).join('')}</Avatar>
          </div>
          <Grid className={classes.root} container justify="space-between" >
            <Grid item xs={12} sm>
              <Typography className={classes.heading}>{friend.full_name}</Typography>
            </Grid>
            <Grid item xs={12} sm>
              <Typography className={classes.heading}>{friend.email}</Typography>
            </Grid>
            <Grid item xs={12} sm>
              <Typography className={classes.heading}>Friend Since: 12/12/2019</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
      ))}

      </div>
    </div>
  );
}
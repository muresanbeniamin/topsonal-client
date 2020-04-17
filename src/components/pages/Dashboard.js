import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ViewList from '../list/ViewList';
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

  const dashboardLists = useSelector(state => state.dashboard.dashboardLists);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedList, setSelectedList] = React.useState(null);

  const handleClickOpen = list => event => {
    setSelectedList(list)
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedList(null)
    setOpen(false);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {dashboardLists && dashboardLists.map((list) => (
            <Grid key={`${list.id}-list`} item>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">
                      {list.user.full_name.split(' ').map(name => name[0]).join('')}
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
                <div onClick={handleClickOpen(list)}>
                  <CardMedia
                    className={classes.media}
                    image={list.image_url}
                    title={list.name}
                  />
                </div>
              </Card>
            </Grid>
          ))}
          {selectedList && <ViewList list={selectedList} open={open} handleClose={handleClose} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default (requireAuth(dashboard));

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    textTransform: 'none',
    color: theme.palette.primary.main,
  }
}));

export default function LeftSideMenu() {
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link className={classes.link} href="/profile">
          <ListItem button key="profile">
            <ListItemIcon>
              <AccountCircleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link className={classes.link} href="/dashboard">
          <ListItem button key="dashboard">
            <ListItemIcon>
              <DashboardIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link className={classes.link} href="/my-lists">
          <ListItem button key="my-lists">
            <ListItemIcon>
              <PlaylistAddCheckIcon color="secondary" />
              </ListItemIcon>
            <ListItemText primary="My lists" />
          </ListItem>
        </Link>
        <Link className={classes.link} href="/my-friends">
          <ListItem button key="my-friends">
            <ListItemIcon>
              <GroupIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer('left', true)}
        edge="start"
        className={classes.menuButton}
        color="inherit"
        >
        <MenuIcon color="secondary"/>
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}
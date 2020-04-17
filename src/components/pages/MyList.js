import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getList } from '../../actions';
import requireAuth from '../auth/requireAuth';

const useStyles = makeStyles(theme => ({
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
  }
}));

const myList = function ViewList() {
  useEffect(() => {
    function fetchList() {
      dispatch(getList(id, authToken));
    }
    fetchList();
  }, []);
  const { id } = useParams();
  const authToken = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();

  const classes = useStyles();
  debugger;
  const list = useSelector(state => state.lists.list);

  return (
    <div className={classes.rightAligned}>
      {list &&
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {list.name}
              </Typography>
              <Button autoFocus color="secondary" variant="contained">
                Add Item
              </Button>
            </Toolbar>
          </AppBar>

          <Typography className={classes.listDescription} variant="h6" gutterBottom>
            {list.description}
          </Typography>
          
          <Divider />

          <List className={classes.list}>
            {list.items.map((item, index) => (
              <ListItem className={classes.listItem} alignItems="flex-start" key={`${index}-item`} button>
                <ListItemAvatar>
                  <Avatar alt={item.name} className={classes.large} src={item.url} />
                </ListItemAvatar>
                <ListItemText className={classes.listText} secondary={`${index + 1}. ${item.name}`} />
              </ListItem>
            ))}
          </List>
        </div>
      }
    </div>
  );
}

export default (requireAuth(myList));

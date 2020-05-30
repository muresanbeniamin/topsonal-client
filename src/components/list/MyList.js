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
import { getList, deleteItem } from '../../actions';
import requireAuth from '../auth/requireAuth';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  listText: {
    paddingLeft: 10
  }
}));

const list = function MyList() {
  useEffect(() => {
    function fetchList() {
      dispatch(getList(id, authToken));
    }
    fetchList();
  }, []);
  let loading = true;
  const { id } = useParams();
  const history = useHistory();
  const authToken = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();

  const classes = useStyles();
  const list = useSelector(state => state.lists.list);
  if (list.friendly_id === id) { 
    loading = false;
  }
  const handleAddItem = event => {
    history.push(`/new-item/${id}`);
  }

  const handleDeleteItem = (item) => () => {
    dispatch(deleteItem(authToken, item));
  }

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {list && !loading && list.name}
          </Typography>
          <Button autoFocus color="secondary" variant="contained" onClick={handleAddItem}>
            Add Item
          </Button>
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress color="secondary" />}

      <Container maxWidth="xl">
        <Typography>
          {list.description}
        </Typography>
        <Divider />

        {list && !loading &&
          <List className={classes.list}>
            {list.items.map((item, index) => (
              <div>
                <ListItem className={classes.listItem} key={`${index}-item`} button>
                  <ListItemAvatar>
                    <Avatar alt={item.title} className={classes.large} src={item.image_url} />
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.year} />
                  <ListItemText secondary={item.author} />
                  <ListItemText secondary={item.actors} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={handleDeleteItem(item)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            ))}
          </List>
        }
      </Container>
    </div>
  );
}

export default (requireAuth(list));

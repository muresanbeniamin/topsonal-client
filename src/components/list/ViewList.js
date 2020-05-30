import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
  },
  listDescription: {
    marginTop: 20,
    fontSize: 16
  }
}));

const list = function ViewList() {
  useEffect(() => {
    function fetchList() {
      dispatch(getList(id, authToken));
    }
    fetchList();
  }, []);
  let loading = true;
  const { id } = useParams();
  const authToken = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();

  const classes = useStyles();
  const list = useSelector(state => state.lists.list);
  if (list.friendly_id === id) { 
    loading = false;
  }

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {list && !loading && list.name}
          </Typography>
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress color="secondary" />}
      <Container maxWidth="xl">
        <Typography className={classes.listDescription}>
          {list.description}
        </Typography>
        <Divider />

        {list && !loading &&
          <List>
            {list.items.map((item, index) => (
              <div>
                <ListItem key={`${index}-item`} button>
                  <ListItemAvatar>
                    <Avatar alt={item.title} className={classes.large} src={item.image_url} />
                  </ListItemAvatar>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} sm={6}>
                      <ListItemText primary={item.title} secondary={item.year} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText secondary={item.author} />
                      <ListItemText secondary={item.actors} />
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        }
      </Container>
    </div>
  );
}

export default (requireAuth(list));

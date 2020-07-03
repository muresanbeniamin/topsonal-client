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
import { getFollowedList } from '../../actions';
import requireAuth from '../auth/requireAuth';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton } from '@material-ui/core';

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

const list = function ViewFollowedList() {
  useEffect(() => {
    function fetchList() {
      dispatch(getFollowedList(id, authToken));
    }
    fetchList();
  }, []);
  const { id } = useParams();
  const authToken = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();
  const classes = useStyles();
  const list = useSelector(state => state.followed_lists.list);
  const loading = useSelector(state => state.loading.loading);
  const [open, setOpen] = React.useState({});
  const handleClick = (item) => event => {
    if (open[item.id] === undefined) {
      setOpen({...open, [item.id] : false })
    }
    setOpen({...open, [item.id] : !open[item.id] })
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {!loading && list.name}
          </Typography>
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress color="secondary" />}
      <Container maxWidth="xl">
        <Typography className={classes.listDescription}>
          {list.description}
        </Typography>
        <Divider />

        {!loading &&
          <List>
            {list.items.map((item, index) => (
              <div>
                <ListItem key={`${index}-item`}>
                  <ListItemAvatar>
                    <Avatar alt={item.title} className={classes.large} src={item.image_url} />
                  </ListItemAvatar>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} sm={5}>
                      <ListItemText primary={item.title} secondary={item.year} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <ListItemText secondary={item.author} />
                      <ListItemText secondary={item.actors} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Completed"
                      />
                    </Grid>
                  </Grid>
                  <IconButton onClick={handleClick(item)}>
                    {open[item.id] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListItem>
                <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                      <ListItemText primary={'Description:'} secondary={item.description} />
                    </ListItem>
                  </List>
                </Collapse>
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

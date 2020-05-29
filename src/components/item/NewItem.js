import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import requireAuth from '../auth/requireAuth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { getList } from '../../actions';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { reduxForm, Field, reset } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import { itemFinder } from '../../actions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { createItem } from '../../actions';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5)
  },
  appBar: {
    position: 'relative'
  },
  title: {
    flex: 1,
  }
}));

const renderTextField = ({
  label,
  placeholder,
  required,
  variant,
  margin,
  fullWidth,
  id,
  name,
  autoComplete,
  autoFocus,
  input,
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    required={required}
    variant={variant}
    margin={margin}
    fullWidth={fullWidth}
    id={id}
    name={name}
    autoComplete={autoComplete}
    autoFocus={autoFocus}
    {...input}
    {...custom}
  />
)

let item = props => {
  useEffect(() => {
    function fetchList() {
      dispatch(getList(listId, authToken));
    }
    fetchList();
  }, []);
  const classes = useStyles();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  const { listId } = useParams();
  const { handleSubmit } = props;
  const history = useHistory();
  const list = useSelector(state => state.lists.list);
  const itemType = {
    'movies': 'movie',
    'travel': 'place',
    'books': 'book'
  }
  const currentItemType = itemType[list.category];
  const onSubmit = formProps => {
    try {
      dispatch(createItem(listId, formProps, authToken))
      dispatch(reset('create-list-item'));
      history.push(`/my-lists/${listId}`)
    } catch (e) {
    }
  };
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState(null);
  const handleSearchItemOpen = () => {
    setOpen(true);
  };
  const handleCloseSearchItem = () => {
    setOpen(false);
  };
  const handleSearchItem = () => {
    dispatch(itemFinder(keyword, currentItemType, authToken));
  };
  const searchItemChanged = value => {
    setKeyword(value)
  };

  const handleChooseFoundItem = item => event => {
    const values = Object.values(item);
    Object.keys(item).forEach((key, index) => props.change(key, values[index]));
    setOpen(false);
  }

  const foundItems = useSelector(state => state.items.items);
  const loading = useSelector(state => state.items.are_loading);
  
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          {list.name} - Add new {currentItemType}  
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleSearchItemOpen} endIcon={<SearchIcon />}>
            Search {currentItemType}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                name="title"
                type="text"
                label="Title"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="title"
                autoFocus
                required
              />
            </Grid>
            {currentItemType === 'book' &&  <Grid item xs={12} sm={6}>
              <Field
                name="author"
                type="text"
                label="Author"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="author"
                required
              />
            </Grid>}
            {currentItemType === 'movie' &&  <Grid item xs={12} sm={6}>
              <Field
                name="actors"
                type="text"
                label="Main actors"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="actors"
                required
              />
            </Grid>}
            <Grid item xs={4} sm={2} style={{marginTop: '15px'}}>
              <Field
                id="year"
                label="Year"
                type="number"
                component={renderTextField}
                name="year"
                required
              />
            </Grid>
            <Grid item xs={8} sm={10}>
              <Field
                name="image_url"
                type="text"
                label="Image URL"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="image_url"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field
                name="description"
                label="Description"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="description"
                multiline={true}
                rows={4}
              />
            </Grid>
            <Button type="submit" variant="contained" color="secondary">
              Confirm
            </Button>
          </Grid>
        </form>
      </Container>
      <Dialog fullScreen open={open} onClose={handleCloseSearchItem} maxWidth='xs'>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Search a {currentItemType} 
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleCloseSearchItem} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {loading && <LinearProgress color="secondary" />}
        <DialogContent>
          <Grid container 
            alignItems="center"
            justify="center">
            <Grid item xs={11}>
              <TextField fullWidth label={`Search a ${currentItemType} by name...`} autoFocus onChange={e => searchItemChanged(e.target.value)}/>
            </Grid>
            <Grid item>
              <IconButton color="secondary" onClick={handleSearchItem}>
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
          {foundItems.map((item, index) => (
            <ExpansionPanelSummary key={item.title} expandIcon={<ExpandMoreIcon />}>
              <div className={classes.avatar}>
                <Avatar alt={item.title} src={item.image_url} />
              </div>
              <Grid container direction="row">
                <Grid item sm xs={12}>
                  <Typography className={classes.heading}>{item.title}</Typography>
                </Grid>
                <Grid item sm xs={12}>
                  <Typography className={classes.heading}>{item.author}</Typography>
                </Grid>
                <Grid item sm xs={12}>
                  <Typography className={classes.heading}>{item.year}</Typography>
                </Grid>
                <Grid item sm xs={12}> 
                  <Button variant="contained" color="secondary" onClick={handleChooseFoundItem(item)}>
                    This is the {currentItemType}
                  </Button>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
item = reduxForm({
  form: 'create-list-item'
})(item)

export default (requireAuth(item));

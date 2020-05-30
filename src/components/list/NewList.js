import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { reduxForm, Field, reset } from 'redux-form';
import { createlist } from '../../actions';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import Avatar from '@material-ui/core/Avatar';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { getImageUrls } from '../../actions';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

const renderSelectField = ({
  input,
  label,
  children,
  className,
  ...custom
}) => (
  <FormControl className={className}>
    <InputLabel htmlFor="category">Category</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: 'category',
        id: 'category'
      }}
    >
      {children}
    </Select>
  </FormControl>
)

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    height: 137
  },
  centerText: {
    textAlign: 'center'
  },
  formControl: {
    width: '100%',
    marginTop: 15
  },
  avatar: {
    width: '100%',
    height: '200px'
  },
  floatRight: {
    float: 'right'
  },
  appBar: {
    position: 'relative'
  }
}));

let newList = props => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  const imageUrls = useSelector(state => state.google_search.imageUrls);
  const { handleSubmit } = props;
  const [state, setState] = React.useState({addLinkImage: false, linkImage: '', public: true, imageUrlIndex: 0});

  const handleOnBlurName = () => async event => {
    if (event.target.value.length > 5) {
      dispatch(getImageUrls(authToken, event.target.value));
    }
  }

  const handleChangeCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
    if (name === 'public') {
      props.change('is_public', event.target.checked);
    }
  };

  const handleChangeImageUrl = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const shuffleImages = () => {
    const imageUrlsLength = imageUrls.length;
    if (imageUrlsLength > 0) {
      let nextIndex;
      if (state.imageUrlIndex + 1 === imageUrlsLength) {
        nextIndex = 0;
      } else {
        nextIndex = state.imageUrlIndex + 1;
      }
      const imageUrl = imageUrls[nextIndex].src;
      setState({ ...state, 'linkImage': imageUrl, 'imageUrlIndex': nextIndex });
      props.change('image_url', imageUrl);
    }
  };

  if (imageUrls.length > 0 && state.linkImage == '') {
    setState({ ...state, 'linkImage': imageUrls[0].src });
  }

  const onSubmit = formProps => {
    try {
      dispatch(createlist(formProps, authToken))
      dispatch(reset('create-list-form'));
      history.push('my-lists')
    } catch (e) {
      console.log(e);
    }
  };
 
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Share a new list 
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                name="name"
                type="text"
                label="Name of the list"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="name"
                autoFocus
                required
                onBlur={handleOnBlurName()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                className={classes.formControl}
                name="category"
                component={renderSelectField}
                label="Category"
              >
                <MenuItem value={'books'}>Books</MenuItem>
                <MenuItem value={'movies'}>Movies</MenuItem>
                <MenuItem value={'travel'}>Travel</MenuItem>
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="description"
                label="Description"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="description"
                multiline={true}
                rows={12}
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch checked={state.public} onChange={handleChangeCheckbox('public')} value="public" />
                  }
                  label="Make list public"
              />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Avatar className={classes.avatar} variant='square' src={state.linkImage}>Image</Avatar>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch checked={state.addLinkImage} onChange={handleChangeCheckbox('addLinkImage')} value="addLinkImage" />
                  }
                  label="Add image manually"
                />
                <Button
                  color="primary"
                  className={classes.button}
                  startIcon={<ImageSearchIcon />}
                  onClick={shuffleImages}
                >
                  Shuffle image
                </Button>
              </FormGroup>
              <Field 
                name="image_url"
                type="text"
                label="Image Url"
                component={renderTextField}
                disabled={!state.addLinkImage}
                autoComplete="none"
                margin="normal"
                id="image_url" 
                onChange={handleChangeImageUrl('linkImage')}
                fullWidth
              />
            </Grid>
            <Button type="submit" variant="contained" color="secondary">
              Share
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

newList = reduxForm({
  form: 'create-list-form'
})(newList)

export default newList;
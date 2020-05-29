import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import requireAuth from '../auth/requireAuth';
import { getprofile, updateUser } from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { reduxForm, Field } from 'redux-form';
import Container from '@material-ui/core/Container';

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
  },
  appBar: {
    flexGrow: 1
  },
  newListButton: {
    float: 'right'
  },
  title: {
    flex: 1,
  }
}));

let profile = function Profile(props) {
  const { handleSubmit } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  useEffect(() => {
    function fetchProfile() {
      dispatch(getprofile(authToken));
    }
    fetchProfile();
  }, []);
  const classes = useStyles();
  const profile = useSelector(state => state.profile.profile);
  if (profile.email) {
    props.change('full_name', profile.full_name);
  }

  const handleAddList = event => {
    history.push('/new-list');
  }

  const onSubmit = formProps => {
    try {
      dispatch(updateUser(formProps, profile.id, authToken))
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Profile
          </Typography>
          <Button className={classes.newListButton} autoFocus color="secondary" variant="contained" onClick={handleAddList}>
            Add New List
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container className={classes.root} justify="center">
            <Grid item xs={12} sm={6}>
              <Field
                name="full_name"
                type="text"
                label="Full Name"
                component={renderTextField}
                autoComplete="none"
                margin="normal"
                fullWidth
                id="full_name"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button color="secondary">
                Change Password
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button color="secondary">
                Change Email
              </Button>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="secondary">
            Update
          </Button>
        </form>
      </Container>
    </div>
  );
}
profile = reduxForm({
  form: 'profile'
})(profile)


export default (requireAuth(profile));

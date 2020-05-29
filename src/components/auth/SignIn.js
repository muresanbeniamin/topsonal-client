import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Topsonal '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 100,
    height: 100,
    backgroundColor: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  redText: {
    textAlign: "center",
    color: 'red',
    marginTop: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {

  componentDidMount() {
    if (this.props.authenticated) {
      if(this.props.history) {
        this.props.history.push('/dashboard');
      }
    }
  }

  componentDidUpdate() {
    if (this.props.authenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/dashboard');
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar variant="square" className={classes.avatar}>
            <img height="100px" width="100px" alt="Topsonal" src="/images/topsonal.png" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Topsonal
          </Typography>
          <div className={classes.redText}> {this.props.errorAuthMessage} </div>
          <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="email"
              type="text"
              label="Email"
              component={renderTextField}
              autoComplete="none"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              required
              autoFocus
            />
            <Field
              name="password"
              type="password"
              label="Password"
              component={renderTextField}
              autoComplete="none"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>Sign In</Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recover-password" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
};

function mapStateToProps(state) {
  return {
    errorAuthMessage: state.auth.errorAuthMessage,
    authenticated: state.auth.authenticated
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' }),
  withStyles(styles)
)(SignIn);
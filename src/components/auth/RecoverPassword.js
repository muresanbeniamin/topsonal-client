import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Topsonal'}
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
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 70,
    height: 70,
    backgroundColor: theme.palette.secondary.main,
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
  greenText: {
    textAlign: "center",
    color: 'green',
    marginTop: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  centeredText: {
    textAlign: "center"
  }
});

class RecoverPassword extends Component {

  onSubmit = formProps => {
    this.props.recoverpassword(formProps);
  };

  render() {
    const { handleSubmit } = this.props;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img height="60px" width="60px" alt="Topsonal" src="/images/topsnal.png" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recover Password
          </Typography>
          <div className={classes.redText}> {this.props.recoverPasswordErrorMessage} </div>
          <div className={classes.greenText}> {this.props.recoverPasswordSucessMessage} </div>
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
                autoFocus
              />
            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>Recover</Button>
            <div className={classes.centeredText}>
              <Link href="/" variant="body2">
                {"Received the new password? Log In"}
              </Link>
            </div>
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
    recoverPasswordSucessMessage: state.auth.recoverPasswordSucessMessage,
    recoverPasswordErrorMessage: state.auth.recoverPasswordErrorMessage
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'recoverpassword' }),
  withStyles(styles)
)(RecoverPassword);
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import { reduxForm, Field, reset } from 'redux-form';
import { createlist } from '../../actions';

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
  card: {
    width: 345,
  },
  centerText: {
    textAlign: 'center'
  }
}));

let CreateList = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);

  const { handleSubmit } = props

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = data => {
    dispatch(reset('create-list-form'));
    setOpen(false);
  };

  const onSubmit = formProps => {
    dispatch(createlist(formProps, authToken))
    console.log(formProps);
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.centerText}>
          <IconButton size="small" color="primary" onClick={handleSubmit(handleClickOpen)}>
            <AddIcon style={{fontSize: 70}}/>
          </IconButton>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new list</DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Field
              name="name"
              type="text"
              label="Name of the list"
              component={renderTextField}
              autoComplete="none"
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              autoFocus
            />
            <Field
              name="description"
              type="text"
              label="Description"
              component={renderTextField}
              autoComplete="none"
              variant="outlined"
              margin="normal"
              fullWidth
              id="description"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

CreateList = reduxForm({
  form: 'create-list-form'
})(CreateList)

export default CreateList;
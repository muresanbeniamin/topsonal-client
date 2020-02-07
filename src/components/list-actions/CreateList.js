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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

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
    minWidth: 396,
  }
}));

let CreateList = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  const { handleSubmit } = props;
  const [state, setState] = React.useState({wantBackground: false});

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(reset('create-list-form'));
    setOpen(false);
  };

  const onSubmit = async formProps => {
    try {
      await dispatch(createlist(formProps, authToken))
      setOpen(false);
      dispatch(reset('create-list-form'));
    } catch (e) {
      console.log(e);
    }
  };

  let backgroundUrl = null;
  if (state.wantBackground) {
    backgroundUrl = <Field name="background_url" type="text"
                      label="Background Url" component={renderTextField}
                      autoComplete="none" margin="normal" fullWidth
                      id="background_url"/>
  }
    
  return (
    <div>
      <Card className={classes.card} onClick={handleSubmit(handleClickOpen)}>
        <CardContent className={classes.centerText}>
          <IconButton size="small" color="secondary">
            <AddIcon style={{fontSize: 85}}/>
          </IconButton>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <DialogTitle id="form-dialog-title">Create a new list</DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
            />
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
            <Field
              name="description"
              type="text"
              label="Description"
              component={renderTextField}
              autoComplete="none"
              margin="normal"
              fullWidth
              id="description"
              required
            />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch checked={state.wantBackground} onChange={handleChange('wantBackground')} value="wantBackground" />
                }
                label="Background"
              />
              <FormControlLabel
                control={
                  <Switch checked={state.wantBackground} onChange={handleChange('wantBackground')} value="wantBackground" />
                }
                label="Background"
              />
            </FormGroup>
            {backgroundUrl}
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="secondary">
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
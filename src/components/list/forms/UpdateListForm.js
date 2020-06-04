import React from 'react'
import {Field, reduxForm} from 'redux-form'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateList } from '../../../actions';
import requireAuth from '../../auth/requireAuth';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox'

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
  formControl: {
    width: '100%',
    marginTop: 15
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

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

let UpdateListForm = props => {
  const {handleSubmit, pristine, submitting} = props;
  const classes = useStyles();
  const [state, setState] = React.useState({public: props.is_public});
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleChangeCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
    if (name === 'public') {
      props.change('is_public', event.target.checked);
    }
  };

  const authToken = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();

  const onSubmit = formProps => {
    try {
      dispatch(updateList(formProps.id, formProps, authToken))
      setOpenSnackBar(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              required
            />
            <Field
              name="description"
              label="Description"
              component={renderTextField}
              autoComplete="none"
              margin="normal"
              fullWidth
              id="description"
              multiline={true}
              rows={8}
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
            <Field 
              name="image_url"
              type="text"
              label="Image Url"
              component={renderTextField}
              autoComplete="none"
              margin="normal"
              id="image_url" 
              fullWidth
            />
            <Field name="is_public" component={renderCheckbox} label="Public list" />
            <Button type="submit" disabled={pristine || submitting} variant="contained" color="secondary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Successfully updated list"
      />
    </div>
  )
}

UpdateListForm = reduxForm({
  form: 'update-list-form'
})(UpdateListForm)

export default requireAuth(UpdateListForm);

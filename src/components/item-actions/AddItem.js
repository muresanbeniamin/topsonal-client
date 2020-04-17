import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  rightAligned: {
    marginLeft: 'auto',
  },
  fontSize: {
    fontSize: 14
  },
  listText: {
    paddingLeft: 10
  },
  listDescription: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  listItem: {
    maxWidth: '70%',
    marginLeft: '15%',
    marginRight: '15%'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function ViewList(props) {
  const classes = useStyles();
  const currentList = props.list;

  return (
    <div className={classes.rightAligned}>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {currentList.name}
            </Typography>
            <Button autoFocus color="secondary" variant="contained" onClick={props.handleClose}>
              Add Item
            </Button>
            <Button autoFocus color="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <Typography className={classes.listDescription} variant="h6" gutterBottom>
          {currentList.description}
        </Typography>
        
        <Divider />

        <List className={classes.list}>
          {currentList.items.map((item, index) => (
            <ListItem className={classes.listItem} alignItems="flex-start" key={`${index}-item`} button>
              <ListItemAvatar>
                <Avatar alt={item.name} className={classes.large} src={item.url} />
              </ListItemAvatar>
              <ListItemText className={classes.listText} secondary={`${index + 1}. ${item.name}`} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
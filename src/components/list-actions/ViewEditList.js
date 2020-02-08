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
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
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
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewEditList(list) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const currentList = list.list;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.rightAligned}>
      <IconButton className={classes.fontSize} onClick={handleClickOpen} size="small" color="primary">
        OPEN/EDIT <ArrowForwardIosTwoToneIcon/>
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {currentList.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Typography className={classes.listDescription} variant="h6" gutterBottom>
          {currentList.description}
        </Typography>
        
        <Divider />

        <List className={classes.list}>
          {currentList.items.map((item, index) => (
            <ListItem className={classes.listItem} alignItems="flex-start" key={`${item.id}-list`} button>
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
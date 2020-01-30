import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: theme.spacing(2)
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function MyFriends() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.avatar}>
            <Avatar className={classes.orange}>BM</Avatar>
          </div>
          <Grid container className={classes.root} spacing={10}>
            <Grid item xs={12}>
              <Grid container justify="space-between" >
                  <Grid key="1" item>
                    <Typography className={classes.heading}>Bob Marian</Typography>
                  </Grid>
                  <Grid key="2" item>
                    <Typography className={classes.heading}>bob.marian@hotmail.com</Typography>
                  </Grid>
                  <Grid key="3" item>
                    <Typography className={classes.heading}>Friend Since: 12/12/2019</Typography>
                  </Grid>
                  <Grid key="4" item>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.avatar}>
            <Avatar className={classes.orange}>BM</Avatar>
          </div>
          <Grid container className={classes.root} spacing={10}>
            <Grid item xs={12}>
              <Grid container justify="space-between" >
                  <Grid key="1" item>
                    <Typography className={classes.heading}>Bob Marian</Typography>
                  </Grid>
                  <Grid key="2" item>
                    <Typography className={classes.heading}>bob.marian@hotmail.com</Typography>
                  </Grid>
                  <Grid key="3" item>
                    <Typography className={classes.heading}>Friend Since: 12/12/2019</Typography>
                  </Grid>
                  <Grid key="4" item>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.avatar}>
            <Avatar className={classes.orange}>BM</Avatar>
          </div>
          <Grid container className={classes.root} spacing={10}>
            <Grid item xs={12}>
              <Grid container justify="space-between" >
                  <Grid key="1" item>
                    <Typography className={classes.heading}>Bob Marian</Typography>
                  </Grid>
                  <Grid key="2" item>
                    <Typography className={classes.heading}>bob.marian@hotmail.com</Typography>
                  </Grid>
                  <Grid key="3" item>
                    <Typography className={classes.heading}>Friend Since: 12/12/2019</Typography>
                  </Grid>
                  <Grid key="4" item>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.avatar}>
            <Avatar className={classes.orange}>BM</Avatar>
          </div>
          <Grid container className={classes.root} spacing={10}>
            <Grid item xs={12}>
              <Grid container justify="space-between" >
                  <Grid key="1" item>
                    <Typography className={classes.heading}>Bob Marian</Typography>
                  </Grid>
                  <Grid key="2" item>
                    <Typography className={classes.heading}>bob.marian@hotmail.com</Typography>
                  </Grid>
                  <Grid key="3" item>
                    <Typography className={classes.heading}>Friend Since: 12/12/2019</Typography>
                  </Grid>
                  <Grid key="4" item>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
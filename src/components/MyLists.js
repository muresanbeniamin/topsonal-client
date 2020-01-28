import React, { Component } from 'react';
import requireAuth from './requireAuth';
import * as actions from '../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import CreateList from './list-actions/CreateList';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5)
  },
  card: {
    width: 345,
  },
  rightAlignedButton: {
    marginLeft: 'auto',
    fontSize: 14
  },
  centerText: {
    textAlign: 'center'
  }
});

class MyLists extends Component {

  componentDidMount() {
    this.props.getprofile(this.props.auth);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {this.props.currentUserLists.map((list) => (
              <Grid key={list.id} item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {list.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {list.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" color="primary">
                      <FavoriteTwoToneIcon/> {list.likes}
                    </IconButton>
                    <IconButton className={classes.rightAlignedButton} size="small" color="primary">
                      OPEN <ArrowForwardIosTwoToneIcon/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            <Grid key='addButton' item>
              <CreateList/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return { 
    profile: state.profile.profile,
    profileError: state.profile.profileError,
    currentUserLists: state.profile.currentUserLists
  };
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles),
)(requireAuth(MyLists));

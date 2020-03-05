import React, { Component } from 'react';
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
import CreateList from '../list-actions/CreateList';
import ViewEditList from '../list-actions/ViewEditList';
import requireAuth from '../auth/requireAuth';
import * as actions from '../../actions';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5)
  },
  card: {
    width: 345,
    height: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
              <Grid key={`${list.id}-list`} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {list.user.full_name.split(' ').map(name => name[0]).join('')}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={list.name}
                    subheader={list.created_date}
                  />
                  <CardMedia
                    className={classes.media}
                    image={list.image_url}
                    title={list.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                    </Typography>
                    <Typography noWrap variant="body2" color="textSecondary" component="p">
                      {list.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" color="secondary">
                      <FavoriteTwoToneIcon className={classes.likeIcon}/> {list.likes}
                    </IconButton>
                    <ViewEditList list={list}/>
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

import React, { Component } from 'react';
import requireAuth from './requireAuth';
import * as actions from '../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Dashboard extends Component {

  componentDidMount() {
    // take the all the lists from friends - tbi
    // this.props.getprofile(this.props.auth);
  }

  render() {
    return (
      <div className="lists-container">
        Activity of my friends
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    profile: state.profile.profile,
    profileError: state.profile.profileError
  };
}

export default compose(
  connect(mapStateToProps, actions),
)(requireAuth(Dashboard));

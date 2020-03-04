import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../auth/requireAuth';
import * as actions from '../../actions';

class Dashboard extends Component {

  componentDidMount() {
    // take the all the lists from friends - tbi
    // this.props.getprofile(this.props.auth);
  }

  render() {
    return (
      <div className="friend-lists">

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 

  };
}

export default compose(
  connect(mapStateToProps, actions),
)(requireAuth(Dashboard));

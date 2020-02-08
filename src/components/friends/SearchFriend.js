/* eslint-disable no-use-before-define */
import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { getusers } from '../../actions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export default function SearchFriend(props) {
  // const dispatch = useDispatch();
  // const authToken = useSelector(state => state.auth.authenticated);
  // let filteredUsers = useSelector(state => state.users.users);

  // const searchFriendChanged = value => {
  //   if (value !== '') {
  //     dispatch(getusers(authToken, value));
  //   }
  // };

  return (
    <div style={{ maxWidth: '200px', marginRight: 'auto', marginLeft: 'auto' }}>
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      {/* <Autocomplete
        freeSolo
        options={filteredUsers.map(option => option.full_name)}
        renderInput={params => (
          <TextField onChange={e => searchFriendChanged(e.target.value)} {...params} label="Search Friend" margin="normal" variant="outlined" fullWidth />
        )}
      /> */}
    </div>
  );
}
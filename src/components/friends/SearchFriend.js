/* eslint-disable no-use-before-define */
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getusers } from '../../actions';


export default function SearchFriend(props) {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.authenticated);
  let filteredUsers = useSelector(state => state.users.users);

  const searchFriendChanged = value => {
    dispatch(getusers(authToken, value));    
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <Autocomplete
        freeSolo
        options={filteredUsers.map(option => option.full_name)}
        renderInput={params => (
          <TextField onChange={e => searchFriendChanged(e.target.value)} {...params} label="Search Friend" margin="normal" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
}
import {
    SET_USERS,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    SET_FILTERED_USERS
  } from './actionTypes';
  import { v4 as uuidv4 } from 'uuid'; 
  

  export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users,
  });
  

  export const addUser = (userData) => ({
    type: ADD_USER,
    payload: {
      ...userData,
      id: uuidv4(), 
    },
  });
  

  export const updateUser = (updatedUser) => ({
    type: UPDATE_USER,
    payload: updatedUser,
  });
  
 
  export const deleteUser = (userId) => ({
    type: DELETE_USER,
    payload: userId,
  });
  

  export const setFilteredUsers = (filteredUsers) => ({
    type: SET_FILTERED_USERS,
    payload: filteredUsers,
  });
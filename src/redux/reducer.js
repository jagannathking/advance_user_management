import {
    SET_USERS,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    SET_FILTERED_USERS
  } from './actionTypes';
  
  const initialState = {
    users: [], 
    filteredUsers: [], 
  };
  
 
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USERS:

      return {
          ...state,
          users: action.payload,
          filteredUsers: action.payload, 
        };
  
      case ADD_USER: {

        const newUsers = [...state.users, action.payload];

        return {
          ...state,
          users: newUsers,
        };
      }
  
      case UPDATE_USER: {

        const updatedUsers = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        const updatedFilteredUsers = state.filteredUsers.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        return {
          ...state,
          users: updatedUsers,
          filteredUsers: updatedFilteredUsers,
        };
      }
  
      case DELETE_USER: {

        const userIdToDelete = action.payload;
        return {
          ...state,
          users: state.users.filter(user => user.id !== userIdToDelete),
          filteredUsers: state.filteredUsers.filter(user => user.id !== userIdToDelete),
        };
      }
  
      case SET_FILTERED_USERS:
        return {
          ...state,
          filteredUsers: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
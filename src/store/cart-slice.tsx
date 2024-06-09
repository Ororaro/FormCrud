import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "",
      data: [],
    },
  ],
  updateUser: [
    {
      id: "",
      data: [],
    },
  ],
};
export const cartSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const data = {
        id: nanoid(),
        data: action.payload,
      };
      state.users.push(data);
      let userData = JSON.stringify(current(state.users));
      localStorage.setItem("users", userData);
      console.log('values',data)

    },
    deleteUser: (state, action) => {
      const deletedUserIds = action.payload;
      const data = state.users.filter((item) => !deletedUserIds.includes(item.id));
      state.users = data;
      console.log('state.updateUser =>>',action.payload )
    },
    updateUser: (state, action) => {
      const updataList = state.users.filter((users) => {
        return users.id === action.payload;
      });
      console.log('action =>>',action.payload )
      state.updateUser = updataList;
      localStorage.setItem('updateList', JSON.stringify(updataList));
    },
    editUser: (state, action) => {
      const data  = action.payload;
      const userIndex = state.users.findIndex(user => user.id === data.id);
      state.users[userIndex].data = data;
      // if (userIndex !== -1) {
      //   state.users[userIndex].data = data;
      // }
    },
  },
});

export const { addUser, deleteUser, updateUser, editUser } = cartSlice.actions;

export default cartSlice.reducer;

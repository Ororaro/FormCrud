import { PayloadAction, createSlice, current, nanoid } from "@reduxjs/toolkit";


interface User {
  id: string;
  data: any;
}
interface State {
  users: User[];
  updateUser: User[];
}

const initialState: State = {
  users: [],
  updateUser: [],
};

export const listSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<any>) => {
      const data = {
        id: nanoid(),
        data: action.payload,
      };
      state.users.push(data);
      let userData = JSON.stringify(current(state.users));
      localStorage.setItem("users", userData);
    },
    deleteUser: (state, action: PayloadAction<string[]>) => {
      const deletedUserIds = action.payload;
      const data = state.users.filter((item) => !deletedUserIds.includes(item.id));
      state.users = data;
    },
    updateUser: (state, action: PayloadAction<string>) => {
      const updataList = state.users.filter((users) => {
        return users.id === action.payload;
      });
      state.updateUser = updataList;
      localStorage.setItem('updateList', JSON.stringify(updataList));
    },
    editUser: (state, action:PayloadAction<User>) => {
      const data  = action.payload;
      const userIndex = state.users.findIndex(user => user.id === data.id);
      state.users[userIndex].data = data;
    },
  },
});

export const { addUser, deleteUser, updateUser, editUser } = listSlice.actions;

export default listSlice.reducer;

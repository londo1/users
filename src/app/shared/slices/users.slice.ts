import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState, User } from "../models/users.model";

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    SET_USERS_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    POPULATE_USERS: (state, action: PayloadAction<User[]>) => {
      state.usersList = action.payload?.map((user) => ({
        ...user,
        loading: false,
      }));
      state.loading = false;
    },
    UPDATE_USER: (state, action: PayloadAction<User>) => {
      const userIndex = state.usersList.findIndex(
        (user) => user.id === action.payload.id,
      );
      state.usersList[userIndex] = action.payload;
    },
    SET_SPECIFIC_USER_LOADING: (
      state,
      action: PayloadAction<{ loading: boolean; userId: number }>,
    ) => {
      const userIndex = state.usersList.findIndex(
        (user) => user.id === action.payload.userId,
      );
      state.usersList[userIndex] = {
        ...state.usersList[userIndex],
        loading: action.payload.loading,
      };
    },
    SET_USER: (state, action: PayloadAction<{ newUser: User }>) => {
      const userIndex = state.usersList.findIndex(
        (user) => user.id === action.payload.newUser.id,
      );
      userIndex !== -1
        ? (state.usersList[userIndex] = {
            ...action.payload.newUser,
            loading: false,
          })
        : (state.usersList = [
            ...state.usersList,
            {
              ...action.payload.newUser,
              loading: false,
            },
          ]);
    },
  },
});

export const {
  SET_USERS_LOADING,
  POPULATE_USERS,
  UPDATE_USER,
  SET_SPECIFIC_USER_LOADING,
  SET_USER,
} = usersSlice.actions;

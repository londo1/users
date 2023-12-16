import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState, Post } from "./user-posts.model";

export const usersPostsSlice = createSlice({
  name: "user-posts",
  initialState,
  reducers: {
    POPULATE_USER_POSTS: (
      state,
      action: PayloadAction<{ userId: number; posts: Post[] }>,
    ) => {
      state.usersPosts[action.payload.userId] = action.payload.posts;
      state.loading = false;
    },
    UPDATE_USER_POST: (state, action: PayloadAction<Post>) => {
      const postIndex = state.usersPosts[action.payload.userId].findIndex(
        (post) => post.id === action.payload.id,
      );
      state.usersPosts[action.payload.userId][postIndex] = {
        ...action.payload,
      };
    },
    DELETE_POST: (state, action: PayloadAction<Post>) => {
      const postIndex = state.usersPosts[action.payload.userId].findIndex(
        (post) => post.id === action.payload.id,
      );
      state.usersPosts[action.payload.userId].splice(postIndex, 1);
    },
    SET_USER_POSTS_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  POPULATE_USER_POSTS,
  UPDATE_USER_POST,
  DELETE_POST,
  SET_USER_POSTS_LOADING,
} = usersPostsSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { usersPostsSlice } from "../app/user-posts/user-posts.slice";
import { usersTasks } from "../app/users-tasks/users-tasks.slice";
import { usersSlice } from "../app/shared/slices/users.slice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    userPosts: usersPostsSlice.reducer,
    usersTasks: usersTasks.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

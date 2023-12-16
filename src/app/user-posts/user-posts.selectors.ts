import { RootState } from "../../store/store";

export const userPostsSelector = (userId: number) => (state: RootState) =>
  state.userPosts.usersPosts[userId];

export const userPostsListLoading = () => (state: RootState) =>
  state.userPosts.loading;

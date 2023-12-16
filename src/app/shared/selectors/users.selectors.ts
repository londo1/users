import { RootState } from "../../../store/store";

export const usersListSelector = (state: RootState) => state.users.usersList;

export const usersListLoadingSelector = (state: RootState) =>
  state.users.loading;

export const userSelector = (userId: number) => (state: RootState) =>
  state.users.usersList.find(({ id }) => userId === id);

export const userLoadingSelector = (userId: number) => (state: RootState) =>
  state.users.usersList.find(({ id }) => userId === id)?.loading;

import { RootState } from "../../store/store";

export const usersTasksSelector = (state: RootState) =>
  state.usersTasks.usersTasks;

export const usersTasksPageSizeSelector = (state: RootState) =>
  state.usersTasks.pageSize;

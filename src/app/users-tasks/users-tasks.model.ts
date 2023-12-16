export interface UserTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UsersTasksState {
  usersTasks: UserTask[];
  pageSize: number;
}

export const initialState: UsersTasksState = {
  usersTasks: [],
  pageSize: 10,
};

export interface UserTaskRow {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  username: string;
}

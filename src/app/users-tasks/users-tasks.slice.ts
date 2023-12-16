import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState, UserTask } from "./users-tasks.model";

export const usersTasks = createSlice({
  name: "users-tasks",
  initialState,
  reducers: {
    POPULATE_USER_TASKS: (state, action: PayloadAction<UserTask[]>) => {
      state.usersTasks = action.payload;
    },
    UPDATE_USER_TASK: (state, action: PayloadAction<UserTask>) => {
      const taskIndex = state.usersTasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      state.usersTasks[taskIndex] = action.payload;
    },
  },
});

export const { POPULATE_USER_TASKS, UPDATE_USER_TASK } = usersTasks.actions;

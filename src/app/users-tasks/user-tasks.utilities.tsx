import { UserTask, UserTaskRow } from "./users-tasks.model";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { TableColumn } from "../shared/ui/table/table.model";
import { Checkbox, Input, Select, SelectProps } from "antd";
import React, { Fragment } from "react";
import { User } from "../shared/models/users.model";

export const statusFilterOptions = [
  {
    label: "Completed",
    value: true,
  },
  {
    label: "Not Completed",
    value: false,
  },
];

export const usersFilterOptions = (usersList: User[]) =>
  usersList?.map((user) => ({
    label: user.username,
    value: user.username,
  }));

export const getFilters = (
  setFilterUsernameBy: (value: string[]) => void,
  usernameOptions: SelectProps[],
  setFilterTitleBy: (value: string) => void,
  statusFilterOptions: SelectProps[],
  setFilterStatusBy: (value: boolean[]) => void,
) => [
  {
    render: () => (
      <Fragment key="username-filter-fragment">
        <label htmlFor="username-filter">Username</label>
        <Select
          id="username-filter"
          mode="multiple"
          style={{ width: "20%" }}
          options={usernameOptions}
          onChange={setFilterUsernameBy}
        ></Select>
      </Fragment>
    ),
  },
  {
    render: () => (
      <Fragment key="title-filter-fragment">
        <label htmlFor="title-filter">Title</label>
        <Input
          id="title-filter"
          style={{ width: "30%" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterTitleBy(event.target.value);
          }}
        ></Input>
      </Fragment>
    ),
  },
  {
    render: () => (
      <Fragment key="status-filter-fragment">
        <label htmlFor="status-filter">Status</label>
        <Select
          id="status-filter"
          mode="multiple"
          style={{ width: "20%" }}
          options={statusFilterOptions}
          onChange={setFilterStatusBy}
        ></Select>
      </Fragment>
    ),
  },
];

export const getColumns = (
  toggleTaskStatus: (changedTask: UserTask) => (e: CheckboxChangeEvent) => void,
): TableColumn<UserTask>[] => [
  {
    label: "Task Id",
    key: "id",
    width: "100px",
  },
  {
    label: "Username",
    key: "username",
    width: "200px",
  },
  {
    label: "Title",
    key: "title",
    width: "700px",
  },
  {
    label: "Completed",
    key: "completed",
    width: "100px",
    render: (_: TableColumn<UserTask>, userTask: UserTask) => (
      <>
        <Checkbox
          checked={userTask.completed}
          onChange={toggleTaskStatus(userTask)}
        ></Checkbox>
      </>
    ),
  },
];

export function debounce(callback: Function, timeout = 300) {
  let timer: NodeJS.Timer;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      callback.apply(this, args);
    }, timeout);
  };
}

export const mapTasksToUsername = (
  usersTasks: UserTask[],
  usersList: User[],
): UserTaskRow[] =>
  usersTasks.map((task) => {
    const username = usersList?.find((user) => user.id === task.userId)!
      ?.username;
    return { ...task, username: username || task.userId.toString() };
  });

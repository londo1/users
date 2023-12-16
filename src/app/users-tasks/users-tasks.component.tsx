import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import {
  usersTasksPageSizeSelector,
  usersTasksSelector,
} from "./users-tasks.selectors";
import { POPULATE_USER_TASKS, UPDATE_USER_TASK } from "./users-tasks.slice";
import { Table } from "../shared/ui/table/table.component";
import { UserTask, UserTaskRow } from "./users-tasks.model";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  statusFilterOptions,
  debounce,
  getColumns,
  getFilters,
  mapTasksToUsername,
  usersFilterOptions,
} from "./user-tasks.utilities";
import { usersListSelector } from "../shared/selectors/users.selectors";
import { useGetUsers } from "../shared/hooks/use-get-users";
import { useGetRequest } from "../shared/hooks/use-get-request";
import { Spin } from "antd";

const GET_TASKS_URL = "https://jsonplaceholder.typicode.com/todos";

const UsersTasks = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(usersListSelector);
  const pageSize = useSelector(usersTasksPageSizeSelector);
  const usersTasks = useSelector(usersTasksSelector);
  const mappedUsers = useMemo(
    () => mapTasksToUsername(usersTasks, usersList),
    [usersTasks, usersList],
  );

  const [loading, setLoading] = useState(true);
  const [filterUsernameBy, setFilterUsernameBy] = useState<string[]>([]);
  const [filterStatusBy, setFilterStatusBy] = useState<boolean[]>([]);
  const [filterTitleBy, setFilterTitleBy] = useState<string>("");

  const debouncedSetFilterTitleBy = debounce(setFilterTitleBy, 300);
  const filterFields = getFilters(
    setFilterUsernameBy,
    usersFilterOptions(usersList),
    debouncedSetFilterTitleBy,
    statusFilterOptions,
    setFilterStatusBy,
  );

  const toggleTaskStatus =
    (updatedTask: UserTask) => (event: CheckboxChangeEvent) => {
      dispatch(
        UPDATE_USER_TASK({ ...updatedTask, completed: event.target.checked }),
      );
    };

  const filteredRows = useMemo(() => {
    if (
      !filterUsernameBy.length &&
      !filterStatusBy.length &&
      !filterTitleBy.length
    )
      return mappedUsers;

    if (mappedUsers.length > 0) {
      const list: UserTaskRow[] = [];
      for (const current of mappedUsers) {
        const usernameMatch =
          !filterUsernameBy.length ||
          filterUsernameBy.includes(current.username);
        const statusMatch =
          !filterStatusBy.length || filterStatusBy.includes(current.completed);
        const titleMatch =
          !filterTitleBy.length || current.title.includes(filterTitleBy);

        if (usernameMatch && statusMatch && titleMatch) {
          list.push(current);
        }
      }
      return list;
    }

    return [];
  }, [filterStatusBy, filterTitleBy, filterUsernameBy, mappedUsers]);

  useGetUsers();

  const usersTasksPromise = useGetRequest(
    GET_TASKS_URL,
    "There was an error loading users tasks",
  );
  useEffect(() => {
    usersTasksPromise
      .then((tasks: UserTask[]) => {
        dispatch(POPULATE_USER_TASKS(tasks));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [usersTasksPromise]);

  return (
    <>
      <Spin spinning={loading}>
        <Table
          title="Users tasks"
          columns={getColumns(toggleTaskStatus)}
          tableElements={filteredRows}
          pageSize={pageSize}
          filterFields={filterFields}
          tableId="users-tasks"
        />
      </Spin>
    </>
  );
};

export default UsersTasks;

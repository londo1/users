import React from "react";
import { useSelector } from "react-redux";
import { Collapse, CollapseProps, Spin } from "antd";
import { UserDetails } from "../shared/components/user-details/user-details.component";
import {
  usersListLoadingSelector,
  usersListSelector,
} from "../shared/selectors/users.selectors";
import { useGetUsers } from "../shared/hooks/use-get-users";
import "./users-list.styles.module.css";

const UsersList = () => {
  const users = useSelector(usersListSelector);
  const loading = useSelector(usersListLoadingSelector);
  useGetUsers();

  const userDetailsItems: CollapseProps["items"] = users.map((user, index) => ({
    key: user.id,
    label: user.username,
    children: <UserDetails userId={user.id} showSeePosts></UserDetails>,
  }));

  if (!users?.length && !loading) {
    return <h3>Sorry there are no users to display</h3>;
  }

  return (
    <Spin spinning={loading}>
      <h3>Users list</h3>

      <Collapse items={userDetailsItems}></Collapse>
    </Spin>
  );
};

export default UsersList;

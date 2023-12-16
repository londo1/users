import { useEffect } from "react";
import { GET_USERS_URL } from "../constants/user.constants";
import { POPULATE_USERS, SET_USERS_LOADING } from "../slices/users.slice";
import { useDispatch } from "react-redux";
import { useGetRequest } from "./use-get-request";

export const useGetUsers = () => {
  const dispatch = useDispatch();

  const usersListPromise = useGetRequest(
    GET_USERS_URL,
    "There was an error loading users",
  );

  useEffect(() => {
    dispatch(SET_USERS_LOADING(true));
    usersListPromise
      .then((json) => {
        dispatch(POPULATE_USERS(json));
      })
      .finally(() => SET_USERS_LOADING(false));
  }, [usersListPromise]);

  return {};
};

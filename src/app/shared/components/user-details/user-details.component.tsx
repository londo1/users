import {
  User,
  UserDetailsComponentProps,
  UserKey,
} from "../../models/users.model";
import { Button, Divider, Flex, Form, Input, Spin } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import { PUT } from "../../utilities/api-client";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SPECIFIC_USER_LOADING,
  SET_USER,
  UPDATE_USER,
} from "../../slices/users.slice";
import {
  userLoadingSelector,
  userSelector,
} from "../../selectors/users.selectors";
import {
  ADDRESS_FIELDS,
  COMPANY_DETAILS_FIELDS,
  GEOGRAPHIC_COORDINATE_FIELDS,
  getUpdateUserUrl,
  getUserUrl,
  USER_DETAILS_FIELDS,
} from "./user-details.constants";
import { useNavigate } from "react-router-dom";
import styles from "./user-details.styles.module.css";
import { MessageApiContext } from "../../../../App";
import { useGetRequest } from "../../hooks/use-get-request";

export const UserDetailsComponent: FC<UserDetailsComponentProps> = ({
  userId,
  showSeePosts = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(useSelector(userSelector(userId)));
  const loading = useSelector(userLoadingSelector(userId));
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);
  const [resettable, setResettable] = useState(false);
  const messageApi = useContext(MessageApiContext);

  const submitUser = (payload: User) => {
    dispatch(SET_SPECIFIC_USER_LOADING({ userId, loading: true }));
    PUT(getUpdateUserUrl(userId), payload)
      .then((updatedUser: User) => {
        dispatch(UPDATE_USER(updatedUser));
        setUser(updatedUser);
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "There was an error updating the user details",
        });
      })
      .finally(() => {
        dispatch(SET_SPECIFIC_USER_LOADING({ userId, loading: false }));
      });
  };

  const handleValidationResult = (
    hasFormValueChanges: boolean,
    formIsValid: boolean,
  ) => {
    if (!hasFormValueChanges) {
      setSubmittable(false);
      setResettable(false);
      return;
    }
    if (formIsValid) {
      setSubmittable(true);
      setResettable(true);
      return;
    }
    setSubmittable(false);
    setResettable(true);
  };

  useEffect(() => {
    const formValues = form.getFieldsValue();
    const propertyKeys = Object.keys(formValues) as UserKey[];
    const hasFormValueChanges = propertyKeys.some(
      (propertyKey: UserKey) =>
        JSON.stringify(formValues[propertyKey]) !==
        JSON.stringify(user?.[propertyKey]),
    );

    form.validateFields({ validateOnly: true }).then(
      () => {
        handleValidationResult(hasFormValueChanges, true);
      },
      () => {
        handleValidationResult(hasFormValueChanges, false);
      },
    );
  }, [form, user, values]);

  const userPromise = useGetRequest(
    getUserUrl(userId),
    "There was an error getting the user details",
  );
  useEffect(() => {
    if (!user) {
      userPromise
        .then((newUser) => {
          dispatch(SET_USER({ newUser }));
          setUser(newUser);
          form.setFieldsValue(newUser);
        })
        .finally(() => {
          dispatch(SET_SPECIFIC_USER_LOADING({ userId, loading: false }));
        });
    }
  }, [userPromise, user, userId]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size={"small"}
        initialValues={user}
        onFinish={(values) => {
          submitUser(values);
        }}
      >
        <Flex wrap="wrap" justify="space-evenly">
          <div className={styles["form-section-container"]}>
            <Divider>User Details</Divider>

            {USER_DETAILS_FIELDS.map((field) => (
              <Form.Item {...field} key={`${field.name.join("-")}-${userId}`}>
                <Input />
              </Form.Item>
            ))}
          </div>

          <div className={styles["form-section-container"]}>
            <Divider>Address</Divider>
            <Flex>
              <div>
                {ADDRESS_FIELDS.map((field) => (
                  <Form.Item
                    {...field}
                    key={`${field.name.join("-")}-${userId}`}
                  >
                    <Input />
                  </Form.Item>
                ))}
              </div>

              <div>
                {GEOGRAPHIC_COORDINATE_FIELDS.map((field) => (
                  <Form.Item
                    {...field}
                    key={`${field.name.join("-")}-${userId}`}
                  >
                    <Input />
                  </Form.Item>
                ))}
              </div>
            </Flex>
          </div>

          <div className={styles["form-section-container"]}>
            <Divider>Company Details</Divider>

            {COMPANY_DETAILS_FIELDS.map((field) => (
              <Form.Item {...field} key={`${field.name.join("-")}-${userId}`}>
                <Input />
              </Form.Item>
            ))}
          </div>
        </Flex>
        <Flex justify="space-evenly">
          <Button
            danger
            type="default"
            size="large"
            disabled={!resettable}
            onClick={() => {
              form.setFieldsValue(user);
            }}
          >
            Reset
          </Button>

          {showSeePosts && (
            <Button
              size="large"
              type="default"
              onClick={() => {
                navigate(`/user/${userId}`);
              }}
            >
              See Posts
            </Button>
          )}

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            disabled={!submittable}
          >
            Submit
          </Button>
        </Flex>
      </Form>
    </Spin>
  );
};

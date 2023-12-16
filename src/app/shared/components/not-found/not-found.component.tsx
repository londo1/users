import React from "react";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Path not found, here are some useful links
      </h2>
      <Flex align={"center"}>
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ margin: " 0 1em" }}
          onClick={() => {
            handleLinkClick("/");
          }}
        >
          Users List
        </Button>

        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ margin: " 0 1em" }}
          onClick={() => {
            handleLinkClick("/tasks");
          }}
        >
          Users Tasks
        </Button>
      </Flex>
    </>
  );
};

export default NotFound;

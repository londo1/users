import { Button, Card, Form, Input, Popconfirm, Spin } from "antd";
import { Post, UserPostProperties } from "../user-posts.model";
import { FC, useContext, useState } from "react";
import { PUT } from "../../shared/utilities/api-client";
import { useDispatch } from "react-redux";
import { UPDATE_USER_POST } from "../user-posts.slice";
import { MessageApiContext } from "../../../App";

const { TextArea } = Input;

export const UserPost: FC<UserPostProperties> = ({
  post,
  handleDeletePost,
}) => {
  const dispatch = useDispatch();
  const [editingPost, setEditingPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const updatePostUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}`;
  const messageApi = useContext(MessageApiContext);

  const handleEditPost = () => {
    setLoading(true);
    PUT(updatePostUrl, { ...post, ...form.getFieldsValue() })
      .then((updatedPost: Post) => {
        setEditingPost(false);
        dispatch(UPDATE_USER_POST(updatedPost));
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "There was an error updating the post",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleCancelEdit = () => {
    setEditingPost(false);
    form.resetFields();
  };

  const getActionButtons = () =>
    editingPost
      ? [
          <Button key="cancel" danger type="default" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="default"
            onClick={() => {
              handleEditPost();
            }}
          >
            Submit
          </Button>,
        ]
      : [
          <Button
            key="edit"
            type="default"
            onClick={() => setEditingPost(true)}
          >
            Edit
          </Button>,
          <Popconfirm
            title="Delete the post"
            description="Are you sure to delete this post?"
            onConfirm={() => handleDeletePost(post)}
            okText="Yes"
            cancelText="No"
          >
            <Button key="delete" danger type="default">
              Delete
            </Button>
            ,
          </Popconfirm>,
        ];

  return (
    <Form form={form} initialValues={post}>
      <Spin spinning={loading}>
        <Card
          size="small"
          style={{ width: 300 }}
          title={
            editingPost ? (
              <Form.Item name="title">
                <TextArea rows={2} value={post.title}></TextArea>
              </Form.Item>
            ) : (
              <p
                style={{
                  textWrap: "wrap",
                }}
              >
                {post.title}
              </p>
            )
          }
          actions={getActionButtons()}
        >
          {editingPost ? (
            <Form.Item name="body">
              <TextArea rows={6} value={post.body}></TextArea>
            </Form.Item>
          ) : (
            <p>{post.body}</p>
          )}
        </Card>
      </Spin>
    </Form>
  );
};

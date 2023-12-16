import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Flex, Spin } from "antd";
import { Post } from "./user-posts.model";
import {
  DELETE_POST,
  POPULATE_USER_POSTS,
  SET_USER_POSTS_LOADING,
} from "./user-posts.slice";
import { UserDetailsComponent } from "../shared/components/user-details/user-details.component";
import { DELETE } from "../shared/utilities/api-client";
import {
  userPostsListLoading,
  userPostsSelector,
} from "./user-posts.selectors";
import { UserPost } from "./user-post/user-post.component";
import { useGetRequest } from "../shared/hooks/use-get-request";
import { useContext, useEffect } from "react";
import { MessageApiContext } from "../../App";

const UserPostsList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userPosts = useSelector(userPostsSelector(+id!));
  const loading = useSelector(userPostsListLoading());
  const messageApi = useContext(MessageApiContext);

  const userPostsPromise = useGetRequest(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
    "There was an error loading users posts",
  );
  useEffect(() => {
    dispatch(SET_USER_POSTS_LOADING(true));
    userPostsPromise
      .then((userPosts: Post[]) => {
        dispatch(POPULATE_USER_POSTS({ userId: +id!, posts: userPosts }));
      })
      .catch(() => {
        dispatch(SET_USER_POSTS_LOADING(false));
      });
  }, [userPostsPromise]);

  const handleDeletePost = (post: Post) => {
    DELETE(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then(() => {
        dispatch(DELETE_POST(post));
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "There was an error deleting the user post",
        });
      });
  };

  return (
    <>
      <UserDetailsComponent
        showSeePosts={false}
        userId={+id!}
      ></UserDetailsComponent>

      <Divider>User Posts</Divider>

      <Spin spinning={loading}>
        <Flex
          gap={"small"}
          align="flex-start"
          justify="space-around"
          wrap="wrap"
        >
          {userPosts?.map((post) => (
            <UserPost
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
            ></UserPost>
          ))}
          {!loading && !userPosts?.length && (
            <h3>There are no posts to display</h3>
          )}
        </Flex>
      </Spin>
    </>
  );
};

export default UserPostsList;

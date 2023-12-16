export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface UserPostsState {
  usersPosts: { [key: number]: Post[] };
  loading: boolean;
}

export const initialState: UserPostsState = {
  usersPosts: {},
  loading: true,
};

export interface UserPostProperties {
  post: Post;
  handleDeletePost: (post: Post) => void;
}

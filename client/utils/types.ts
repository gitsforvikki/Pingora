export interface UserState {
  userinfo: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface PostState {
  posts: {
    id: number;
    title: string;
    body: string;
  }[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  user: UserState;
  post: PostState;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

import { StaticImageData } from "next/image";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getPostById,
  likePost,
} from "./postActions";
import { createSlice } from "@reduxjs/toolkit";

export interface PostType {
  _id: string;
  user: string;
  name: string;
  text: string;
  image: string | StaticImageData;
  avatar: string;
  likes: {
    user: string;
    _id: string;
  }[];
  comments: {
    user: string;
    text: string;
    name: string;
    avatar: string;
    date: Date;
    _id: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const initialState = {
  posts: [] as PostType[],
  post: null as PostType | null,
  loading: false,
  error: null as string | null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        console.log(action.payload);
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(likePost.pending, (state) => {
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;
        const index = state.posts.findIndex((p) => p._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addComment.pending, (state) => {
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;
        const index = state.posts.findIndex((p) => p._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteComment.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;
        const index = state.posts.findIndex((p) => p._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
        state.error = null;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.post = null;
        state.error = action.payload as string;
      })
      //delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post.__v.toString() !== action.payload.post.__v.toString()
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;

export const { clearError } = postSlice.actions;

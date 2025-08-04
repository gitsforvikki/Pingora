import { StaticImageData } from "next/image";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "./postReducer";
import api from "@/utils/api";
import { ApiError } from "@/utils/types";
import { getAuthToken, isLoggedIn, setAuthToken } from "@/utils/AuthUtil";

//get all posts
export const getAllPosts = createAsyncThunk<PostType[]>(
  "/posts",
  async (_, { rejectWithValue }) => {
    try {
      if (!isLoggedIn) {
        return rejectWithValue("No authentication token found");
      }
      setAuthToken(getAuthToken());
      const response = await api.get("/posts");
      return response.data.posts;
    } catch (error) {
      const err = error as ApiError;
      const message =
        err.response?.data?.message || err.message || "Failed to fetch user";
      return rejectWithValue(message);
    }
  }
);

//get a comment by id
export const getPostById = createAsyncThunk<
  { post: PostType },
  { postId: string },
  { rejectValue: string }
>("/posts/getSinglePost", async ({ postId }, { rejectWithValue }) => {
  try {
    if (!isLoggedIn) {
      return rejectWithValue("No authentication token found");
    }
    setAuthToken(getAuthToken());
    const response = await api.get(`/posts/${postId}`);
    return response.data.post;
  } catch (error) {
    const err = error as ApiError;
    const message =
      err.response?.data?.message || err.message || "Failed to fetch user";
    return rejectWithValue(message);
  }
});

//create a post
export const createPost = createAsyncThunk<
  { msg: string; post: PostType },
  { text: string; image: string | StaticImageData },
  { rejectValue: string }
>("/posts/create", async ({ text, image }, { rejectWithValue }) => {
  try {
    if (!isLoggedIn()) {
      return rejectWithValue("No authentication token found");
    }
    setAuthToken(getAuthToken());
    const response = await api.post("/posts/create", {
      text,
      image,
    });
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    const message =
      err.response?.data?.message || err.message || "Registration failed";
    return rejectWithValue(message);
  }
});

//likes post
export const likePost = createAsyncThunk<
  { post: PostType },
  { postId: string },
  { rejectValue: string }
>("posts/likes", async ({ postId }, { rejectWithValue }) => {
  try {
    if (!isLoggedIn()) {
      return rejectWithValue("You must be logged in to like a post.");
    }

    setAuthToken(getAuthToken());

    const response = await api.put(`/posts/likes/${postId}`);

    return response.data;
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };

    const message =
      err.response?.data?.message ||
      err.message ||
      "An error occurred while liking the post.";

    return rejectWithValue(message);
  }
});

//add comment on a post
export const addComment = createAsyncThunk<
  { post: PostType },
  { postId: string; text: string },
  { rejectValue: string }
>("posts/comment", async ({ postId, text }, { rejectWithValue }) => {
  try {
    if (!isLoggedIn()) {
      return rejectWithValue("You must be logged in to comment.");
    }

    setAuthToken(getAuthToken());

    const response = await api.post(`/posts/comment/${postId}`, {
      text,
    });

    return response.data;
  } catch (error: unknown) {
    // Type assertion for API error
    const err = error as {
      response?: {
        data?: { message?: string; errors?: Array<{ msg: string }> };
      };
      message?: string;
    };

    // Extract error message
    const message =
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.msg ||
      err.message ||
      "Failed to add comment";

    return rejectWithValue(message);
  }
});

//delete comment
export const deleteComment = createAsyncThunk<
  { post: PostType },
  { postId: string; commentId: string },
  { rejectValue: string }
>("post/deleteComment", async ({ postId, commentId }, { rejectWithValue }) => {
  try {
    if (!isLoggedIn()) {
      return rejectWithValue("You must be logged in to delete a comment.");
    }

    setAuthToken(getAuthToken());

    // Make DELETE request
    const response = await api.delete(`/posts/comment/${postId}/${commentId}`);

    return response.data;
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { errors?: Array<{ msg: string }>; message?: string };
      };
      message?: string;
    };

    const message =
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.msg ||
      err.message ||
      "Failed to delete comment";

    return rejectWithValue(message);
  }
});

//delet post
export const deletePost = createAsyncThunk<
  { post: PostType },
  { postId: string },
  { rejectValue: string }
>("/posts/deletePost", async ({ postId }, { rejectWithValue }) => {
  try {
    if (!isLoggedIn()) {
      return rejectWithValue("You must be logged in to delete a comment.");
    }
    setAuthToken(getAuthToken());

    const res = await api.delete(`/posts/${postId}`);
    return res.data;
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { errors?: Array<{ msg: string }>; message?: string };
      };
      message?: string;
    };

    const message =
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.msg ||
      err.message ||
      "Failed to delete comment";

    return rejectWithValue(message);
  }
});

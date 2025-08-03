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

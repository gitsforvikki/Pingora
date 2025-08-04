"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/customHook/hook";
import {
  addComment,
  getAllPosts,
  likePost,
} from "@/lib/redux/slices/post/postActions";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import { PostCard } from "@/modules/post/PostCard";

export default function PostPage() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, posts]);
  const handleLike = (postId: string) => {
    dispatch(likePost({ postId }));
  };

  const handleComment = (postId: string, text: string) => {
    dispatch(addComment({ postId, text }));
  };

  return (
    <div className="container">
      {loading ? (
        <h2>Loading...</h2>
      ) : posts?.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

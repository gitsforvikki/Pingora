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
import { PostCard } from "@/modules/post/PostCard";

export default function PostPage() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  //like or dislike post
  const handleLike = async (postId: string) => {
    try {
      await dispatch(likePost({ postId })).unwrap();
      dispatch(getAllPosts());
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  //add a comment
  const handleComment = async (postId: string, text: string) => {
    try {
      await dispatch(addComment({ postId, text })).unwrap();
      dispatch(getAllPosts());
    } catch (err) {
      console.error("Comment failed:", err);
    }
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

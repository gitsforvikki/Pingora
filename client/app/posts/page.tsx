"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/customHook/hook";
import {
  addComment,
  deleteComment,
  deletePost,
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
  const handleLike = (postId: string) => {
    dispatch(likePost({ postId })).unwrap();
  };

  //add a comment
  const handleComment = (postId: string, text: string) => {
    dispatch(addComment({ postId, text })).unwrap();
  };
  //add a comment
  const handleDeleteComment = (postId: string, commentId: string) => {
    dispatch(deleteComment({ postId, commentId })).unwrap();
  };

  //delete post
  const handleDeletePost = (postId: string) => {
    dispatch(deletePost({ postId }));
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
            onDeleteComment={handleDeleteComment}
            onDeletePost={handleDeletePost}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

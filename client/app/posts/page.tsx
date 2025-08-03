"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/customHook/hook";
import { getAllPosts } from "@/lib/redux/slices/post/postActions";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import { PostCard } from "@/modules/post/PostCard";

export default function PostPage() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  const handleLike = (postId: string) => {
    // setPosts((prevPosts) =>
    //   prevPosts.map((post) => {
    //     if (post._id === postId) {
    //       // Simple like toggle logic (in real app, this would be more sophisticated)
    //       const hasLiked = post.likes.some(
    //         (like) => like.user === "currentUser"
    //       );
    //       return {
    //         ...post,
    //         likes: hasLiked
    //           ? post.likes.filter((like) => like.user !== "currentUser")
    //           : [
    //               ...post.likes,
    //               { user: "currentUser", _id: `like_${Date.now()}` },
    //             ],
    //       };
    //     }
    //     return post;
    //   })
    // );
  };

  const handleComment = (postId: string, commentText: string) => {
    // setPosts((prevPosts) =>
    //   prevPosts.map((post) => {
    //     if (post._id === postId) {
    //       const newComment = {
    //         user: "currentUser",
    //         text: commentText,
    //         name: "You",
    //         avatar:
    //           "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100",
    //         date: new Date(),
    //         _id: `comment_${Date.now()}`,
    //       };
    //       return {
    //         ...post,
    //         comments: [...post.comments, newComment],
    //       };
    //     }
    //     return post;
    //   })
    // );
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
            // onLike={handleLike}
            // onComment={handleComment}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

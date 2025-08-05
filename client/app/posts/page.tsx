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
        <div className="min-h-screen flex justify-center items-center">
          <h2 className="text-xl lg:text-3xl">Loading...</h2>
        </div>
      ) : posts?.length > 0 ? (
        <div className="flex flex-col gap-y-10 mt-10 md:mt-12 lg:mt-16">
          <div>
            <h2 className="text-violet-400 text-2xl lg:text-3xl font-bold leading-[150%]">
              Interact with Our Wonderful Community
            </h2>
            <p className="text-base lg:text-xl">
              Join a welcoming space where voices are heard, connections are
              made, and kindness grows. Share your thoughts, support others with
              meaningful likes and comments, and be part of a healing, positive
              community.
            </p>
          </div>
          <div className="flex flex-col gap-y-10">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onDeleteComment={handleDeleteComment}
                onDeletePost={handleDeletePost}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <h2 className="text-xl lg:text-3xl">No Post Available</h2>
        </div>
      )}
    </div>
  );
}

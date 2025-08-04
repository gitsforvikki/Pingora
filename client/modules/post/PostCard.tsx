"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PostType } from "@/lib/redux/slices/post/postReducer";
import { normalizeImageUrl } from "@/utils/imageUtils";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

interface PostCardProps {
  post: PostType;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onDeleteComment?: (postId: string, commentId: string) => void;
  onDeletePost?: (postId: string) => void;
}

export function PostCard({
  post,
  onLike,
  onComment,
  onDeleteComment,
  onDeletePost,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const { userinfo } = useSelector((state: RootState) => state.user);

  // Sync like status based on current user and post.likes
  useEffect(() => {
    if (!userinfo || !post.likes) {
      setIsLiked(false);
      return;
    }

    const hasLiked = post.likes.some(
      (like) => like.user?.toString() === userinfo._id?.toString()
    );
    setIsLiked(hasLiked);
  }, [post.likes, userinfo]);

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return new Date(date).toLocaleDateString();
  };

  // Handle like toggle
  const handleLike = () => {
    if (!onLike) return;
    setIsLiked((prev) => !prev);
    onLike(post._id);
  };

  // Handle new comment
  const handleComment = () => {
    if (newComment.trim()) {
      onComment?.(post._id, newComment);
      setNewComment("");
    }
  };

  // Handle post deletion
  const handleDeletePost = () => {
    if (!onDeletePost) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDeletePost(post._id);
      setIsMenuOpen(false); // Close dropdown after action
    }
  };

  // Show only first 2 comments unless expanded
  const displayedComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 2);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={normalizeImageUrl(post.avatar)}
            alt={`${post.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
            width={100}
            height={100}
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{post.name}</h3>
            <p className="text-gray-500 text-xs">
              {formatTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {/* More Options Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
              {post.user.toString() === userinfo?._id?.toString() ? (
                <button
                  onClick={handleDeletePost}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  Delete Post
                </button>
              ) : (
                <span className="block px-4 py-2 text-sm text-gray-400 italic">
                  No actions
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      {post.text && (
        <div className="px-4 pb-3">
          <p className="text-gray-800 leading-relaxed">{post.text}</p>
        </div>
      )}

      {/* Post Image */}
      {post.image && (
        <div className="relative">
          <Image
            src={
              typeof post.image === "string" ? post.image : post.image.src || ""
            }
            alt="Post content"
            className="w-full h-auto max-h-96 object-cover"
            width={100}
            height={100}
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-3 border-b border-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
          </span>
          <span>
            {post.comments.length}{" "}
            {post.comments.length === 1 ? "comment" : "comments"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-b border-gray-50">
        <div className="flex items-center justify-around">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isLiked
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-current text-red-500" : ""
              }`}
            />
            <span className="font-medium">{isLiked ? "Liked" : "Like"}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Comment</span>
          </button>

          {/* Share Button */}
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Share className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 space-y-4">
          {/* Existing Comments */}
          {post.comments.length > 0 && (
            <div className="space-y-3">
              {displayedComments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex space-x-3 justify-between items-start hover:bg-gray-100 rounded-xl p-2"
                >
                  <div className="flex space-x-3">
                    <Image
                      src={normalizeImageUrl(comment.avatar)}
                      alt={`${comment.name}'s avatar`}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      width={100}
                      height={100}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900">
                        {comment.name}
                      </p>
                      <p className="text-gray-800 text-sm">{comment.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(comment.date)}
                      </p>
                    </div>
                  </div>

                  {/* Delete Comment Button (only for comment owner) */}
                  {comment.user.toString() === userinfo?._id?.toString() && (
                    <button
                      onClick={() => onDeleteComment?.(post._id, comment._id)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              {/* View All / Show Less Button */}
              {post.comments.length > 2 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showAllComments ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span>Show less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      <span>View all {post.comments.length} comments</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Add Comment Input */}
          <div className="flex space-x-3 pt-2">
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleComment()}
              />
              <button
                onClick={handleComment}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

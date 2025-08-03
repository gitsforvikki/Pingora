"use client";
import React, { useState } from "react";
import { Type, Upload, X } from "lucide-react";
import preview from "@/public/asstes/preview.png";
import Image, { StaticImageData } from "next/image";
import { useAppDispatch } from "@/lib/customHook/hook";
import { createPost } from "@/lib/redux/slices/post/postActions";
import { useRouter } from "next/navigation";

type FormData = {
  text: string;
  image: string | StaticImageData | null;
};

export default function CreatePostForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    text: "",
    image: null,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          setFormData((prev) => ({
            ...prev,
            image: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Post submitted:", formData);

    try {
      const imageToSend =
        formData.image &&
        typeof formData.image === "object" &&
        "src" in formData.image
          ? formData.image.src
          : formData.image;

      const payload = {
        text: formData.text,
        image: imageToSend || "",
      };

      await dispatch(createPost(payload)).unwrap();
      router.push("/");
      // Reset form
      setFormData({ text: "", image: null });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm shadow-xl">
          {/* Header */}
          <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Post
            </h3>
            <p className="text-sm text-gray-600">
              Share your thoughts with the world
            </p>
          </div>

          {/* Content */}
          <div className="p-6 pt-0 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Text Field */}
              <div className="space-y-2">
                <label
                  htmlFor="text"
                  className="text-sm font-medium text-gray-700"
                >
                  What is on your mind?
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    id="text"
                    name="text"
                    placeholder="Share your thoughts..."
                    value={formData.text}
                    onChange={handleTextChange}
                    rows={4}
                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Image Upload Field */}
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  Add an Image
                </label>

                {!formData.image ? (
                  <div className="relative">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-transparent hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          Click to upload an image
                        </span>
                        <span className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={formData.image || preview}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Create Post
              </button>
            </form>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Want to save as draft?{" "}
                <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Save Draft
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

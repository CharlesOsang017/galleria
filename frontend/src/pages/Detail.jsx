import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import toast from 'react-hot-toast'

const Detail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  // Fetch post details
  const { data: postDetail, isPending } = useQuery({
    queryKey: ["detailPost"],
    queryFn: async () => {
      const res = await fetch(`/api/post/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error in detail");
      return data;
    },
  });

  // Mutation to add a new comment
  const { mutate: addComment } = useMutation({
    mutationFn: async (newComment) => {
      const res = await fetch(`/api/post/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newComment }),
      });
      if (!res.ok) throw new Error("Error adding comment");
      return res.json();
    },
    onSuccess: () => {
      toast.success('comment posted')
      queryClient.invalidateQueries(["detailPost"]); // Refresh comments
      setCommentText("");
    },
  });

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      addComment(commentText);
    }
    
  };

  return (
    <div className="container md:flex flex-row justify-center pt-8 gap-8 mb-4">
      {/* Left Column */}
      <div className="w-[550px] h-[350px]">
        <div className="pb-2">
          <h1 className="text-2xl font-bold mb-4">{postDetail?.title}</h1>
          <div className="flex gap-1">
            <img
              src={postDetail?.user.profileImg}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div className="flex items-center justify-between w-full">
              <Link
                to={`/profile/${postDetail?.user.username}`}
                className="flex flex-col"
              >
                <small>{postDetail?.user.fullName}</small>
                <small>@{postDetail?.user.username}</small>
              </Link>
              <small className="timestamp text-gray-600">1 day ago</small>
            </div>
          </div>
        </div>

        <img
          src={postDetail?.image}
          alt="detail_page"
          className="w-full h-full object-cover rounded-lg"
        />
        <p className="text-base text-gray-700 pt-3">{postDetail?.description}</p>
        

        {/* Like and Comment Icons */}
        <div className="flex gap-4 items-center justify-end pt-0 text-gray-600">
          <div className="flex items-center gap-1">
            <Heart className={`h-6 w-6 ${postDetail?.likes ? "text-red-500" : ""}`} />
            <span>{postDetail?.likes.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle />
            <span>{postDetail?.comments.length}</span>
          </div>
        </div>
                {/* Add New Comment */}
                <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border rounded px-2 py-1 flex-grow"
          />
          <button onClick={handleCommentSubmit} className="btn btn-accent btn-sm ml-2">
            Post
          </button>
        </div>
      </div>

      {/* Right Column - Comments Section */}
      <div className="flex flex-col w-[400px]">
        <h2 className="text-lg font-extrabold mb-2">Comments</h2>
        
    {/* Display Comments */}
{/* Display Comments */}
<div className="mb-4 space-y-4">
  {postDetail?.comments.map((comment) => (
    <div key={comment._id} className="bg-gray-100 p-4 rounded-lg flex items-start gap-3">
      {/* Display Picture */}
      <img
        src={comment?.user.profileImg || "/default-avatar.png"}
        alt="User Profile"
        className="w-10 h-10 rounded-full"
      />
      
      <div>
        {/* Username and Date */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-900">{comment?.user.username}</p>
          <small className="text-sm text-gray-500">{'today'}</small>
        </div>
        
        {/* Comment Text */}
        <p className="text-gray-700 mt-1">{comment.text}</p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Detail;

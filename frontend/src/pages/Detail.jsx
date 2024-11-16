import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatPostDate } from "../utils/date";

const Detail = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { data: logedInUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const handleDelete = () => {
    // Add delete functionality
    console.log("Deleting post...");
    setShowModal(false);
  };

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

   const timePosted = formatPostDate(postDetail?.createdAt)

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
      toast.success("comment posted");
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

  const { mutate: likePost, isLoading: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/post/likes/${postDetail._id}`, {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "error liking a post");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["detailPost"] });
    },
  });

  const handleLikePost = () => {
    if (isLiking) return;
    likePost();
  };

  const { mutate: deletePost, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/post/delete/${postDetail?._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "error in deleting");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: async () => {
      toast.success("post deleted successffully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/items");
    },
  });

  return (
    <div className="container p-4 md:flex flex-row justify-center gap-8 mb-4">
      {/* Left Column */}
      <div className="w-full sm:w-[350px] md:w-[550px] h-[250px] sm:h-[300px] md:h-[350px] mx-auto sm:mx-0">
        <div className="pb-2">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
            {postDetail?.title}
          </h1>
          <div className="flex gap-2 items-center">
            <img
              src={postDetail?.user.profileImg}
              alt=""
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
            />
            <div className="flex items-center justify-between w-full">
              <Link
                to={`/profile/${postDetail?.user.username}`}
                className="flex flex-col text-sm sm:text-base"
              >
                <small>{postDetail?.user.fullName}</small>
                <small>@{postDetail?.user.username}</small>
              </Link>
              <div className="gap-4 mb-2 spacing-x-8">
                  {/* Options Menu & Modal */}
      <div className="relative">
        {/* MoreVertical Icon positioned above the timestamp on medium screens */}
        <div
          className="absolute md:static top-4 right-4 md:mt-2 md:mr-2 cursor-pointer"
          onClick={toggleMenu}
        >
          <MoreHorizontal className="text-gray-700 sm:text-base md:text-lg lg:text-xl" />
        </div>

        {/* Options Menu */}
        {showMenu && (
          <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg p-2 text-sm md:text-base lg:text-lg">
            <button
              onClick={() => {
                setShowModal(true);
                setShowMenu(false);
              }}
              className="p-1 w-full text-left"
            >
              Options
            </button>
          </div>
        )}

        {/* Modal for Post Options */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full md:max-w-md">
              <h3 className="font-bold mb-4 text-center">Post Options</h3>
              <Link to={`/update/${postDetail?._id}`}>
                <button className="btn btn-primary w-full mb-2 text-sm md:text-base">
                  Update
                </button>
              </Link>
              <button
                onClick={() => deletePost(postDetail?._id)}
                className="btn btn-danger w-full text-sm md:text-base"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline w-full mt-2 text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
                <small className="timestamp text-gray-600 text-xs sm:text-sm">
                 {timePosted}
                </small>
              </div>
            </div>
          </div>
        </div>

        <img
          src={postDetail?.image}
          alt="detail_page"
          className="w-full h-full object-cover rounded-lg"
        />
        <p className="text-sm sm:text-base text-gray-700 pt-2 sm:pt-3">
          {postDetail?.description}
        </p>

        {/* Like and Comment Icons */}
        <div className="flex gap-4 items-center justify-end pt-2 sm:pt-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Heart
              onClick={handleLikePost}
              className={`h-5 w-5 sm:h-6 sm:w-6 cursor-pointer ${
                postDetail?.likes?.includes(logedInUser?._id)
                  ? "text-red-500 fill-current"
                  : ""
              }`}
            />
            <span>{postDetail?.likes.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>{postDetail?.comments.length}</span>
          </div>
        </div>

        {/* Add New Comment */}
        <div className="flex items-center mt-3 sm:mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border rounded px-2 py-1 flex-grow text-sm sm:text-base"
          />
          <button
            onClick={handleCommentSubmit}
            className="btn btn-accent btn-sm ml-2"
          >
            Post
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg font-extrabold mb-2">Comments</h2>
          <div className="mb-4 space-y-3 sm:space-y-4">
            {postDetail?.comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-start gap-2 sm:gap-3"
              >
                <img
                  src={comment?.user.profileImg || "/default-avatar.png"}
                  alt="User Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-900">
                      {comment?.user.username}
                    </p>
                    <small className="text-xs sm:text-sm text-gray-500">
                      {"today"}
                    </small>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm mt-1">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default Detail;

import {Heart, MessageCircle} from 'lucide-react'

const Detail = () => {
  return (
    <div className="container flex justify-center pt-8 gap-8">
      {/* Left Column */}
      <div className="w-[550px] h-[350px]">
        <div className="pb-2">
          {/* Title Section */}
          <h1 className="text-2xl font-bold mb-4">Title of the Image</h1>
          <div className="flex gap-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCp966RcfViF7dWoJsLTVkXfJC6NQeNsPvw&s"
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <small>Charles Osango</small>
                <small>@Charles_17</small>
              </div>
              <small className="timestamp text-gray-600">1 day ago</small>
            </div>
          </div>
        </div>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCp966RcfViF7dWoJsLTVkXfJC6NQeNsPvw&s"
          alt="detail_page"
          className="w-full h-full object-cover rounded-lg"
        />
        <div>
          {/* Description Section */}
          <p className="text-base text-gray-700 pt-3">
            This is the description of the image. It provides additional context
            and details about the content, making it easier for viewers to
            understand the background and significance of the image.
          </p>

          {/* Like and Comment Icons */}
          <div className="flex gap-4 items-center justify-end pt-0 text-gray-600">
            <div className="flex items-center gap-1">
             <Heart className="h-6 w-6 text-red-500 fill-current" />
              <span>120</span>
            </div>
            <div className="flex items-center gap-1">
             <MessageCircle />
              <span>45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col w-[400px]">
        <div className="flex justify-center">
          <h2 className="text-lg font-extrabold mb-2">Comments</h2>
          {/* Comments content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Detail;

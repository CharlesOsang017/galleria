import React from 'react'
import { Link } from 'react-router-dom'
import { formatPostDate } from '../utils/date'

const Item = ({post}) => {
  const timePosted = formatPostDate(post?.createdAt)
  return (
<div className="relative w-full max-w-xm">

  <figure className='shadow-md'>
  <Link to={`/detail/${post._id}`}>
  <img
      src={post.image}
      alt="Shoes"
      className="object-cover rounded-md w-full h-48"
    />
  </Link>
  </figure>
 
  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
    {post?.category}
  </span>

  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
    <p className="text-xs font-bold text-extrabold">{timePosted}</p>
   <Link to={`/profile/${post.user.username}`} className='flex items-center gap-1'>
    <img src={post.user.profileImg} alt=""  className='rounded-full h-10 w-10'/>
   {/* <p className="text-sm font-bold text-extrabold  text-ellipsis">@{post.user.username}</p> */}
   </Link>
  </div>
</div>

  )
}

export default Item
import React from 'react'

const Item = () => {
  return (
<div className="relative w-full max-w-xm">
  <figure className='shadow-md'>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBNimLhpyP4Hr08l_fnBHXVVQbkxpcbzTsw&s"
      alt="Shoes"
      className="object-cover rounded-md w-full h-48 opacity-60"
    />
  </figure>
 
  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
    Category
  </span>

  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
    <p className="text-xs font-bold text-extrabold">2 hours ago</p>
   <div className='flex items-center gap-1'>
    <img src="https://media.gettyimages.com/id/1346361663/vector/holiday-christmas-background.jpg?s=612x612&w=gi&k=20&c=PZ5fShezvvuNY6pEj6_mMEXDwhTwQfeXgdvfuqbAPlc=" alt=""  className='rounded-full h-10 w-10'/>
   <p className="text-sm font-bold text-extrabold  text-ellipsis">@Charles_17</p>
   </div>
  </div>
</div>

  )
}

export default Item
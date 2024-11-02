import React, { useState } from 'react'

const Header = () => {
  const [user, setUser] = useState({
    username: 'Charles_17',
    profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
})
const userFound = true
  return (
    <header className="flex justify-between shadow-md px-6 py-2 items-center sticky top-0 bg-white">
    <div className="logo">
      <img src="/public/svg_lg.png" alt="gallery_logo" className="md:h-20 md:w-20 h-10 w-10" />
    </div>
    <div className="side-bar flex items-center ml-auto">
      {userFound ? (
        <div className="flex items-center gap-2">
          <img src={user.profileImg} alt={user.username} className="h-10 w-10 rounded-full" />
          <h4>@{user.username}</h4>
        </div>
      ) : (
        <button className="btn btn-accent btn-sm md:btn-md">Get Started</button>
      )}
    </div>
  </header>
  
  )
}

export default Header
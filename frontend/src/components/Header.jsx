import React from 'react'

const Header = () => {
  return (
    <header className='flex justify-between shadow-md px-6 py-2 items-center'>
        <div className="logo">
           <img src="/public/svg_lg.png" alt="gallery_logo"  className='md:h-20 md:w-20 h-10 w-10'/>           
        </div>
        <div className="side-bar">
            <button className='btn btn-accent btn-sm md:btn-md'>Get Started</button>
        </div>
    </header>
  )
}

export default Header
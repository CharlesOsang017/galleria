import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Register from './pages/Register'
import Login from './pages/Login'
import Item from './pages/Item'
import Items from './pages/Items'
import Detail from './pages/Detail'
import ProfilePage from './pages/profile/profilePage'
import CreateGalleryPage from './pages/CreateGallery/CreateGalleryPage'

const App = () => {
  return (
    <div>
      <Header />
      {/* <Hero /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Items /> */}
     {/* <Detail /> */}
     {/* <ProfilePage /> */}
     <CreateGalleryPage />
    </div>
  )
}

export default App
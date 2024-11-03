import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Register from './pages/Register'
import Login from './pages/Login'
import Items from './pages/Items'
import Detail from './pages/Detail'
import ProfilePage from './pages/profile/profilePage'
import CreateGalleryPage from './pages/CreateGallery/CreateGalleryPage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
      <Route path='/register' element={<Register />} />
      <Route path="/items" element={<Items />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/profile/:id' element={<ProfilePage />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route  path="/create" element={<CreateGalleryPage />} />
      <Route path='/' element={<Hero />} />
    </Routes>
    </>
  )
}

export default App
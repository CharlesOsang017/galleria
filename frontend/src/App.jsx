import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Register from './pages/Register'
import Login from './pages/Login'
import Item from './pages/Item'
import Items from './pages/Items'

const App = () => {
  return (
    <div>
      <Header />
      {/* <Hero /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Items />
     
    </div>
  )
}

export default App
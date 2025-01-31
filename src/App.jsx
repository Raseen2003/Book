import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import Book from './pages/Book'
import Profile from './components/Profile'
import Bookings from './components/Bookings'
import Booked from './assets/admin/Booked'


function App() {
  

  return (
    <>
     <Header/>
    <Routes>
    <Route path='/' element={<Landing/>} />
    <Route path='/login' element={<Auth/>} />
    <Route path='/register' element={<Auth insideRegister={true}/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/Book' element={<Book/>}/>
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/bookings' element={<Bookings/>}/>
    <Route path='/admin' element={<Booked/>}/>
    </Routes>
   
    <Footer/>
    </>
  )
}

export default App

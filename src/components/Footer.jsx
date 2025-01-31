import React from 'react'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <div style={{height:'300px'}} className='mt-5 container w-100'>
      <div className='d-flex justify-content-between'>
        {/* intro  */}
        <div style={{width:'400px'}} className=''>
          <h5>
          <i class="fa-solid fa-hotel me-3"></i>
          BOOK MY ROOM
          </h5>
          <p>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
          <p>Code licensed MIT, docs CC BY 3.0.</p>
          <p>Currently v5.3.3.</p>

        </div>
        {/* links */}
        <div className='d-flex flex-column'>
          <h5>Links</h5>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Home</Link>
          <Link to={'/Login'} style={{textDecoration:'none',color:'white'}}>Login</Link>
          <Link to={'/Register'} style={{textDecoration:'none',color:'white'}}>Register</Link>

          

        </div>
        {/* guides */}
        <div className='d-flex flex-column'>
          <h5>Guides</h5>
          <a style={{textDecoration:'none',color:'white'}} href="https://react.dev/" target='_blank'>React</a>
          <a style={{textDecoration:'none',color:'white'}} href="https://reactrouter.com/en/main" target='_blank'>React Router</a>
          <a style={{textDecoration:'none',color:'white'}} href="https://react-bootstrap.github.io/" target='_blank'>React Bootstrap</a>

        </div>
        {/* contact */}
        <div className='d-flex flex-column'>
          <h5>Contact Us</h5>
          <div className='d-flex'>
            <input placeholder='Enter your Email here!!!' className='form-control me-2' type="text" />
            <button className='btn btn-info'><i class="fa-solid fa-arrow-right"></i></button>


          </div>
          <div className='d-flex justify-content-between mt-3'>
            <a style={{textDecoration:'none',color:'white'}} target='_blank' href=""><i class="fa-brands fa-twitter"></i></a>
            <a style={{textDecoration:'none',color:'white'}} target='_blank' href=""><i class="fa-brands fa-instagram"></i></a>
            <a style={{textDecoration:'none',color:'white'}} target='_blank' href=""><i class="fa-brands fa-facebook"></i></a>
            <a style={{textDecoration:'none',color:'white'}} target='_blank' href=""><i class="fa-brands fa-linkedin"></i></a>    
            <a style={{textDecoration:'none',color:'white'}} target='_blank' href=""><i class="fa-brands fa-github"></i></a>
            <a style={{textDecoration:'none',color:'white'}} target='_blank' href=""><i class="fa-solid fa-phone"></i></a>
          </div>

        </div>
      </div>
      <p className='text-center mt-3'> Copyright &copy; july 2024 batch,project Fair App. Build with React

      </p>
    </div>
  )
}

export default Footer

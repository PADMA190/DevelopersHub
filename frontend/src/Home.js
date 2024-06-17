import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <nav className='navbar bg-dark shadow'>
       <h1>
        <Link to="/" className='no-underline'><i className='fas fa-code'></i>Developers Hub</Link>
       </h1>
       <ul>
       <li><Link to="/register">Register</Link></li>
       <li><Link to="/login">Login</Link></li>
       </ul>
      </nav>
      <section className='landing'>
      <div className='dark-overlay w-100'>
      <div className='landing-inner'>
      <h1 className='x-large'>Developers Hub</h1>
      <p className='lead'>Create Developer profile/portfolio, share posts and get help from other Developers</p>
      <div className='buttons'>
      <Link to='/register' className='btn btn-primary me-3'>Sign Up</Link>
      <Link to='/login' className='btn btn-light'>Login</Link>
      </div>
      </div>
      </div>
      </section>
    </div>
  )
}

export default Home

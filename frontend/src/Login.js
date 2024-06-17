import React, { useState,} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const navigate=useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', data)
      .then(res => {
        localStorage.setItem('token',res.data.token);
        navigate('/dashboard'); 
      })
      .catch(error => {
        console.error('Error during login:', error);
        // Handle errors, such as displaying error messages to the user
      });
  };



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
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'><i className='fas fa-user'></i> Sign into Your Account</p>
        <form className='form' onSubmit={submitHandler} autoComplete='off'>
          <div className='form-group'>
            <input
              type='email'
              className='form-control my-3'
              placeholder='Email Address'
              name='email'
              onChange={changeHandler}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control my-3'
              placeholder='Password'
              name='password'
              onChange={changeHandler}
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>Don't have an account? <Link to='/register'>Sign Up</Link></p>
      </section>
    </div>
  );
}

export default Login;

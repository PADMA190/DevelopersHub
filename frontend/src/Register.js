import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [data, setData] = useState({
        fullname: '',
        email: '',
        mobile: '',
        skill: '',
        password: '',
        confirmpassword: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/register', data);
            console.log(res.data);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
            setError(err.response.data);
        }
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
                <h1 className='large text-primary'>Sign Up</h1>
                <p className='lead'><i className='fas fa-user'></i> Create Your Account</p>
                <form className='form' onSubmit={submitHandler} autoComplete='off'>
                    {error && <p className='alert alert-danger'>{error}</p>}
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control my-3'
                            placeholder='Name'
                            name='fullname'
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control my-3'
                            placeholder='Email Address'
                            onChange={changeHandler}
                            name='email'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control my-3'
                            placeholder='Mobile'
                            onChange={changeHandler}
                            name='mobile'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control my-3'
                            placeholder='Skill'
                            onChange={changeHandler}
                            name='skill'
                            required
                        />
                        <small className='form-text text-muted'>Please provide skills separated by commas (,)</small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control my-3'
                            placeholder='Password'
                            onChange={changeHandler}
                            name='password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control my-3'
                            placeholder='Confirm Password'
                            onChange={changeHandler}
                            name='confirmpassword'
                            required
                        />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Register' />
                </form>
                <p className='my-1'>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </p>
            </section>
        </div>
    );
}

export default Register;

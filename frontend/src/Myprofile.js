import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import profileimg from './profileimg.png';

const Myprofile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [review, setReview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Fetch user profile and reviews using token
      axios.get('http://localhost:5000/myprofile', {
        headers: {
          'x-token': token
        }
      })
      .then(res => setData(res.data))
      .catch(error => {
        console.error('Error fetching profile:', error);
        // Handle errors
      });

      axios.get('http://localhost:5000/myreview', {
        headers: {
          'x-token': token
        }
      })
      .then(res => setReview(res.data))
      .catch(error => {
        console.error('Error fetching reviews:', error);
        // Handle errors
      });
    }
  }, [navigate]);

  return (
    <div>
      <nav className='navbar bg-dark shadow'>
        <h1>
          <Link to="/" className='no-underline'><i className='fas fa-code'></i>Developers Hub</Link>
        </h1>
        <ul>
          <li><Link to="/myprofile">My Profile</Link></li>
          <li><Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link></li>
        </ul>
      </nav>
      {data && 
        <section className='container'>
          <Link to='/dashboard' className='btn btn-light'>Back To Profiles</Link>

          <div className='profile-grid my-1'>
            <div className='profile-top bg-primary p-2 d-flex  flex-column align-items-center justify-content-center'>
              <img className='imgsz round-img my-1' src={profileimg} alt="not found" />
              <h1 className='large'>{data.fullname}</h1>
              <p className='lead'>{data.email}</p>
            </div>
            <div className='profile-github'>
              <h2 className='text-primary my-1'>
                <i className='fab fa-github'></i>Reviews and Ratings
              </h2>
              <div className='repo bg-white p-1 my-1'>
                {review && review.length > 0 ?
                  review.map((rev, index) => 
                    <div key={index}>
                      <h4>{rev.taskprovider}</h4>
                      <p>{rev.rating}/5</p>
                    </div>
                  )
                  :
                  <p>No Review added yet</p>
                }
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  )
}

export default Myprofile;

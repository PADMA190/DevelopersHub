import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import profileimg from './profileimg.png';

const Indprofile = () => {
  const [rating, setRating] = useState(null);
  const [taskprovider, setTaskprovider] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        const res = await axios.get(`http://localhost:5000/profile/${id}`, {
          headers: {
            'x-token': token
          }
        });
        setProfile(res.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [id, navigate]);

  const fetchTaskProvider = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/myprofile', {
        headers: {
          'x-token': localStorage.getItem('token')
        }
      });
      setTaskprovider(res.data.fullname);
    } catch (error) {
      console.error('Error fetching task provider:', error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchTaskProvider();
  }, [fetchProfile, fetchTaskProvider]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!taskprovider || !profile) {
      return;
    }
    const review = {
      taskprovider,
      taskworker: profile.fullname,
      rating
    };
    try {
      const res = await axios.post('http://localhost:5000/addreview', review, {
        headers: {
          'x-token': localStorage.getItem('token')
        }
      });
      alert(res.data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

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

      <section className='container'>
        <Link to='/dashboard' className='btn btn-light'>Back To Profiles</Link>

        {profile && (
          <div className='profile-grid my-1'>
            <div className='profile-top bg-primary p-2 d-flex  flex-column align-items-center justify-content-center'>
              <img className=' imgsz round-img my-1' src={profileimg} alt="Profile" />
              <h1 className='large'>{profile.fullname}</h1>
              <p className='lead'>{profile.email}</p>
            </div>
            <div className='repo bg-white p-1 my-1'>
              <div>
                <h4>Enter your reviews</h4>
                <form className='form' onSubmit={SubmitHandler} autoComplete='off'>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Enter your rating out of 5'
                      name='rating'
                      className='form-control'
                      onChange={e => setRating(e.target.value)}
                      required
                    />
                  </div>
                  <input type='submit' className='btn btn-primary my-3' value='Add Rating' />
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Indprofile;

import React ,{useState,useEffect}from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import profileimg from './profileimg.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Fetch data using token if needed
      axios.get('http://localhost:5000/allprofiles', {
        headers: {
          'x-token': token
        }
      })
      .then(res => setData(res.data))
      .catch(error => {
        console.error('Error fetching profiles:', error);
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
      <li><Link to="/login" onClick={()=>localStorage.removeItem('token')}>Logout</Link></li>
    </ul>
  </nav>
  <section className='container'>
  <h1 className='large text-primary'>Developers</h1>
  <p className='lead'><i className='fab fa-connectdevelop'></i>Browse and connect with Developers</p>
  <div className='profiles'>
     {data.length>=1?
        data.map(profile=>
            <div className='profile bg-light my-3 p-5 shadow '>
            
            <div className='d-flex flex-row justify-content-start'>
            <div className='d-flex flex-row justify-content-between me-5'>
            <img
            className='round-img imgsz align-self-center me-5'
            
            src={profileimg}
            alt="not found"
            />
            <div>
            <h2>{profile.fullname}</h2>
            <p>{profile.email}</p>
            <Link to={`/profile/${profile._id}`} className='btn btn-primary'>View Profile</Link>
            </div>
            </div>
            <ul className='my-2'>
            {profile.skill.split(',').map(skill=>

                <li className='text-primary'>
                {skill}
                </li>

            )}
            
            </ul>
            </div>
            </div>
        )
        
        :null}
  </div>

  </section>
    </div>
  )
}

export default Dashboard

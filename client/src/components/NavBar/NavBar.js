import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';

import { logout } from '../../redux/actions/authActions';

function NavBar() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/logout', {
      credentials: 'include',
    });
    if (response.ok) {
      dispatch(logout(null));
      navigate('/');
    }
  };

  return (
    <nav>
      <div className="logo">Evernote-clone</div>
      <i className="fas fa-bars" />
      <ul>
        {!auth
          ? (
            <ul>
              <li><Link to="/registration">Sign Up</Link></li>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/">Home</Link></li>
            </ul>
          )
          : (
            <ul>
              <li><Link to={`/lk/${auth.id}`}>{auth.name || 'nickname'}</Link></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pad">Add Pad</Link></li>
              <li><a id="exit" onClick={logoutHandler} href="/">Logout</a></li>
            </ul>
          )}
      </ul>
    </nav>
  );
}

export default NavBar;

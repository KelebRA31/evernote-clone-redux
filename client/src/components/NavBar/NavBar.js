import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import {YelpContext} from '../../context/YelpContextProvider';


function NavBar() {
  const {authState, logoutHandler } = useContext(YelpContext);
  
  return (
    <nav>
      <div className="logo">Evernote-clone</div>
      <i className="fas fa-bars" />
      <ul>
        {!authState
          ? (
            <ul>
              <li><Link to="/registration">Sign Up</Link></li>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/">Home</Link></li> 
            </ul>
          )
          : (
            <ul>
              <li><Link to={`/lk/${authState.id}`}>{authState.name || 'nickname'}</Link></li>
              <li><Link to="/">Home</Link></li>
              <li><a id="exit" onClick={logoutHandler} href="/">Logout</a></li>
            </ul>
          )}
      </ul>
    </nav>
  );
}


export default NavBar;
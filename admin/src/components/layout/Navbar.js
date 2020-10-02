import React from 'react';
import {Link} from 'react-router-dom';


const Navbar =()=>{
    return(
        <nav>
        <div className="logo">
  Consult Doctor</div>
  <input type="checkbox" id="click"/>
        <label  className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
  {/* <li><a className="active" >Home</a></li> */}
  <li><Link to="!#">Developers</Link></li>
  <li><Link to="/register">Register</Link></li>
  <li><Link to="/login">Login</Link></li>
  {/* <li><a href="#">Setting</a></li> */}
  </ul>
  </nav>
    )
}


export default Navbar
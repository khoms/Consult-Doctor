import React from 'react';
import {Link} from 'react-router-dom';

const Landing =()=>{
    return(
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Consult Doctors</h1>
          <p className="lead">
           Virtual Doctor /Online platform for consulting with doctors
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}


export default Landing
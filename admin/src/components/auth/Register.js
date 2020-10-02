import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert,register}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChangeHandler = e =>setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);


    const onSubmitHandler = async e=>{
        // console.log(formData);
        e.preventDefault();
        // console.log(formData);
        if(password!== password2){
            setAlert('Password Donot match','danger');
            console.log('password donot match')


        }else{
            register(name,email,password);
            // const newUser={
            //     name,
            //     email,
            //     password
            // }
            // try{
            //     const config={
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //     }
            //     const body =JSON.stringify(newUser); 
            //     const res= await axios.post('/api/admin',body,config);
            //     console.log(res.data);
            // }
           
            // catch(err){
            //     console.error(err);

            // }
        }
    }


    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e=>onSubmitHandler(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name"
                        value={name}
                        onChange={e => onChangeHandler(e)}
                         />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email"
                        value={email}
                        onChange={e => onChangeHandler(e)}
                         />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => onChangeHandler(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={e => onChangeHandler(e)}
                        
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired
};


export default connect(null,{setAlert,register})(Register);  
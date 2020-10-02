import axios from 'axios';
import {setAlert} from './alert';

import {REGISTER_SUCCESS,REGISTER_FAIL} from './types';

//Register USer

export const register =({name,email,password})=>async dispatch=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body =JSON.stringify({name,email,password});

    try{

        const instance=axios.create({baseURL: 'http://192.168.1.164:3001/api/admin'})
        const res= await instance.post('/api/admin',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
    }
        catch(err){
            const errors = err.response.error;
            if(errors){
                errors.forEach(error =>dispatch(setAlert(error.msg,'danger'))
                    );
            }
            dispatch({
                type:REGISTER_FAIL
            })
        }
    
}
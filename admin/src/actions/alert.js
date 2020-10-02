// import {v4 as uuid} from "uuid"; 

import {SET_ALERT,REMOVE_ALERT} from './types';

export const setAlert =(msg,alertType,timeOut=5000)=>dispatch=>{

    // const id = uuid.v4();
    const id = Math.floor((Math.random() * 100000) + 1);

    dispatch({
        type:SET_ALERT,
        payload:{msg,alertType,id}
    });
    setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),timeOut);
}
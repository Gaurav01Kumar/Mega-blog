import React from 'react'
import {useDispatch} from 'react-redux';
import authService from "../../appwrite/config";
import {logout} from "../../store/authSlice"

const LogoutBtn = ({...props}) => {
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    authService.logout()
    .then(()=>dispatch(logout()))
    
  }
  return (
    <button {...props} onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn
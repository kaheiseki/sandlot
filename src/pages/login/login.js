import React, { useCallback } from 'react'
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import './login.css';


export const Login = () => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[setEmail]);
  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  },[setPassword]);

  const LogIn = (email,password) =>{
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };


  return (
    <div>
      <form>
        <div className='form-group'>
          <label>Email address</label>
          <input type="email" className='form-control' placeholder="Enter email" onChange={inputEmail}/>
        </div>

        <div className='form-group'>
            <label>Password</label>
            <input type="password" className='form-control' placeholder="Enter password" onChange={inputPassword}/>
        </div>

        <div className='form-group'>
          <div className='custom-control custom-checkbox'>
            <input type="checkbox" className='custom-control-input' id="customCheck1"/>
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={LogIn(email,password)}>Submit</button>
        {/* <button onClick = {auth.signOut()}>ログアウト</button> */}
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>


    //     <button className = "button" onClick = {LogIn(email,password)}>ログイン</button>
    //   <div>
    //     Create an account to use Sandlot for free!
    //   </div>
    //   <form>
    //     <h3>Sign In</h3>

    //     <div className="form-group">
    //         <label>Email address</label>
    //         <input type="email" className="form-control" placeholder="Enter email" />
    //     </div>

    //     <div className="form-group">
    //         <label>Password</label>
    //         <input type="password" className="form-control" placeholder="Enter password" />
    //     </div>

    //     <div className="form-group">
    //         <div className="custom-control custom-checkbox">
    //             <input type="checkbox" className="custom-control-input" id="customCheck1" />
    //             <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    //         </div>
    //     </div>

    //     <button type="submit" className="btn btn-primary btn-block">Submit</button>
    //     <p className="forgot-password text-right">
    //         Forgot <a href="#">password?</a>
    //     </p>
    //   </form>
    // </div>
  )
}
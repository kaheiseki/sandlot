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
      <div className='signin_form'>
        <div className='signin_form_inner'>
          <div className='signin_form_text'>Email Address</div>
          <input className='form-control' placeholder="メールアドレス" onChange={inputEmail}/>
          <div className='signin_form_text'>Password</div>
          <input className='form-control' placeholder="パスワード" onChange={inputPassword}/>
        </div>
        <button className = "button" onClick = {LogIn(email,password)}>ログイン</button>
        <button onClick = {auth.signOut()}>ログアウト</button>
      </div>
      <div>
        Create an account to use Sandlot for free!
      </div>
    </div>
  )
}
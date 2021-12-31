import React, { useCallback } from 'react'
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword ,signOut} from "firebase/auth";

export const Login = () => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[setEmail]);
  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  },[setPassword]);

  const LogIn = () =>{
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }
  return (
    <div>
      <input className='form-control' placeholder="メールアドレス" onChange={inputEmail}/>
      <input className='form-control' placeholder="パスワード" onChange={inputPassword}/>
      <button className = "button" onClick = {LogIn(email,password)}>ログイン</button>
      <button onclick = {auth.signOut()}>ログアウト</button>
    </div>
  )
}
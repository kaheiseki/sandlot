import React, { useCallback } from 'react'
import { useState, useEffect } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase";


export const SignUp = () => {
  const[username,setUsername] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value)
  },[setUsername]);
  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[setEmail]);
  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  },[setUsername]);
  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  },[setConfirmPassword]);

  const Signup = (username,email,password,confirmPassword) => {
    return async() => {
      if (username === "" || email === "" || password === "" || confirmPassword === ""){
        alert("必須項目が未入力です");
        return false
      }

      if (password !== confirmPassword){
        alert("パスワードが一致しません")
        return false
      }

      return createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
    }
  }

  return(
    <div>
      <input className='form-control' placeholder="ユーザー名" onChange={inputUsername}/>
      <input className='form-control' placeholder="メールアドレス" onChange={inputEmail}/>
      <input className='form-control' placeholder="パスワード" onChange={inputPassword}/>
      <input className='form-control' placeholder="パスワード（確認用）" onChange={inputConfirmPassword}/>
      <button className = "button" onClick = {Signup(username,email,password,confirmPassword)}>ユーザー登録</button>
    </div>
  )
};

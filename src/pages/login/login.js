import React, { useCallback } from 'react'
import { useState, useEffect } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth,db} from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


export const Login = () => {
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

  const usersCollectionRef = collection(db, "Users");
  const SignUp = (username,email,password,confirmPassword) => {
    return async() => {
      if (username === "" || email === "" || password === "" || confirmPassword === ""){
        alert("必須項目が未入力です");
        return false
      }

      if (password !== confirmPassword){
        alert("パスワードが一致しません")
        return false
      }

      return auth.createUserWithEmailAndPassword(email,password).then(result => {
        const user = result.user
        if(user){
          const uid = user.uid
          addDoc(usersCollectionRef, { name: username, id:uid ,email:email,role:"customer"});
      
        }
      })
    }
  }

  return(
    <div>
      <input className='form-control' placeholder="ユーザー名" onChange={inputUsername}/>
      <input className='form-control' placeholder="メールアドレス" onChange={inputEmail}/>
      <input className='form-control' placeholder="パスワード" onChange={inputPassword}/>
      <input className='form-control' placeholder="パスワード（確認用）" onChange={inputConfirmPassword}/>
      <button className = "button" onClick = {SignUp(username,email,password,confirmPassword)}>ユーザー登録</button>
    </div>
    
  )
};

import React, { useCallback } from 'react'
import { useState } from "react";
import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import {auth, db} from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card , Button} from 'react-bootstrap';
import './signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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
  },[setPassword]);
  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  },[setConfirmPassword]);
  const navigate = useNavigate();


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
        const usersCollectionRef = collection(db, "Users");
        addDoc(usersCollectionRef, { name:username, id:user.uid});
        
      })
      .catch((error) => {
        alert(error.code)
      })
    }
  }
  return(
    <div className='form_outline'>
      <Card>
        <Card.Body>
          <Card.Title className='signup_title'>
            Sign Up
          </Card.Title>
          <div className='form-group'>
            <label>User Name</label>
            <input className='form-control' placeholder="Username" onChange={inputUsername}/>
          </div>

          <div className='form-group'>
              <label>Email</label>
              <input type="email" className='form-control' placeholder="Enter email" onChange={inputEmail}/>
          </div>

          <div className='form-group'>
              <label>Password</label>
              <input type="password" className='form-control' placeholder="Enter password" onChange={inputPassword}/>
          </div>

          <div className='form-group'>
              <label>Password（Confirm）</label>
              <input type="password" className='form-control' placeholder="Enter password (Confirm)" onChange={inputConfirmPassword}/>
          </div>
        </Card.Body>
          <form>
            <Button type="button" className="btn btn-primary btn-block" 
            onClick = {(username,email,password,confirmPassword) => {
              Signup(username,email,password,confirmPassword);
              // navigate("/createteam",{replace:true});
            }}>
              Register
            </Button>
          </form>
      </Card>
    </div>
    // ↑消さないで。
    // <div>
    //   <input className='form-control' placeholder="ユーザー名" onChange={inputUsername}/>
    //   <input className='form-control' placeholder="メールアドレス" onChange={inputEmail}/>
    //   <input className='form-control' placeholder="パスワード" onChange={inputPassword}/>
    //   <input className='form-control' placeholder="パスワード（確認用）" onChange={inputConfirmPassword}/>
    //   <button className = "button" onClick = {Signup(username,email,password,confirmPassword)}>ユーザー登録</button>
    // </div>
  )
};

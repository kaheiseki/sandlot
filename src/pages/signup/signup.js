import React, { useCallback } from 'react'
import { useState } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "../../firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { Card , Button} from 'react-bootstrap';
import './signup.css';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
  //signupのhooks
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

      else if (password !== confirmPassword){
        alert("パスワードが一致しません")
        return false
      }else{
        return createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
          const user = userCredential.user;
          const usersCollectionRef = collection(db, "Users");
          addDoc(usersCollectionRef, { name:username, id:user.uid,email:user.email});
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/createteam",{replace:true});
        })
        .catch((error) => {
          alert(error.code);
        })
      }
    }
  };


 
    return(
      <div className='form_outline'>
        <Card className='signup_card_outline'>
          <Card.Body>
            <Card.Title className='form_title'>
              Sign Up
            </Card.Title>
            <div className='form-group'>
              <label>ユーザー名</label>
              <input
                className='form-control'
                placeholder="Username"
                value={username}
                onChange={inputUsername}
              />
            </div>

            <div className='form-group'>
              <label>メールアドレス</label>
              <input
                type="email"
                className='form-control'
                placeholder="Enter email"
                value={email}
                onChange={inputEmail}
              />
            </div>

            <div className='form-group'>
                <label>パスワード</label>
                <input
                  type="password"
                  className='form-control'
                  placeholder="Enter password"
                  value={password}
                  onChange={inputPassword}
                />
            </div>

          <div className='form-group'>
              <label>パスワード（確認用）</label>
              <input type="password" className='form-control' placeholder="Enter password (Confirm)" value={confirmPassword} onChange={inputConfirmPassword}/>
          </div>
          <form>
            <Button
              type='button'
              className='form_button'
              onClick={Signup(username,email,password,confirmPassword)
              }>
              Start Sandlot
            </Button>
          </form>
        </Card.Body>
      </Card>
      <div>
        <p className='attention_for_signup'>
          登録したメールメールアドレスは他のユーザーに公開されます。
        </p>
        <p className='jump_for_login'>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
    )
};


import React, { useCallback } from 'react'
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword,signOut} from "firebase/auth";
import './login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Card,Button} from 'react-bootstrap';




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
      alert(error.code);
      // catchで終わらないで
    });
  };

  const LogOut = () => {
    console.log("logout");
    auth.signOut();
  }

  return (
    <div className='form_outline'>
      <Card>
        <Card.Body>
          <Card.Title className='login_title'>
            Login
          </Card.Title>
          <div className='form-group'>
            <label>Email address</label>
            <input type="email" className='form-control' placeholder="Enter email" onChange={(e)=>inputEmail(e)}/>
          </div>

          <div className='form-group'>
              <label>Password</label>
              <input type="password" className='form-control' placeholder="Enter password" onChange={(e)=>inputPassword(e)}/>
          </div>

          <div className='form-group'>
            <div className='custom-control custom-checkbox'>
              <input type="checkbox" className='custom-control-input' id="customCheck1"/>
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              {/* Remember meの実装はまだ */}
            </div>
          </div>
        </Card.Body>
          <form>
            <Button type="button" className="btn btn-primary btn-block" onClick={()=>LogIn(email,password)}>
              Submit
            </Button>
          </form>
      </Card>
      <div>
        <p className='jump_for_signup'>
          <a href="/signup">Create an account</a> to use Sandlot for free!
        </p>
      </div>
    </div>
        //<button onClick = {auth.signOut()}>ログアウト</button>
  )
}
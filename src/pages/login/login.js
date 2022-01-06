import React, { useCallback } from 'react'
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import './login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Card,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




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
    if (email === "" || password === ""){
      alert("入力が不正です");
      return false
    }
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
      setEmail("");
      setPassword("");
      //loginできたかわかるためにも、ページ遷移も実装したい
      navigate("/",{replace:true})
    })
    .catch((error) => {
      alert(error.code);
      // catchで終わらないで
    });
  };

  const navigate = useNavigate();

  return (
    <div className='form_outline'>
      <Card className='login_card_outline'>
        <Card.Body>
          <Card.Title className='form_title'>
            Login
          </Card.Title>
          <div className='form-group'>
            <label>Email address</label>
            <input type="email" className='form-control' placeholder="Enter email" value={email} onChange={(e)=>inputEmail(e)}/>
          </div>

          <div className='form-group'>
              <label>Password</label>
              <input type="password" className='form-control' placeholder="Enter password" value={password} onChange={(e)=>inputPassword(e)}/>
          </div>

          <div className='form-group'>
            <div className='custom-control custom-checkbox'>
              <input type="checkbox" className='custom-control-input' id="customCheck1"/>
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              {/* Remember meの実装はまだ */}
            </div>
          </div>
          <form>
            <Button type="button" className="form_button" onClick={() => {LogIn(email,password)}}>
              Submit
            </Button>
          </form>
        </Card.Body>
      </Card>
      <div>
        <p className='jump_for_signup'>
          <a href="/signup">Create an account</a> to use Sandlot for free!
        </p>
      </div>
    </div>
  )
}
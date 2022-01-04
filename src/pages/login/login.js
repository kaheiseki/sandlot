import React, { useCallback } from 'react'
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import './login.css';
import "bootstrap/dist/css/bootstrap.min.css";



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
    <div className='form_outline'>
      {/* <Form className='color-overlay d-flex justify-content-center align-items-center'>
        <Form.Group className='rounded p-4 p-sm-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='password' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label="Remember Me"/>
          <Form.Control type='password' placeholder='password' />
        </Form.Group>
      </Form> */}


      <form className='form-groups'>
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
            {/* Remember meの実装はまだ */}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={LogIn(email,password)}>Submit</button>
        {/* <button onClick = {auth.signOut()}>ログアウト</button> */}
        {/* <p className="forgot-password text-right">
        <a href="#">Forgot password?</a> */}
        {/* </p> */}
      </form>
    </div>
  )
}
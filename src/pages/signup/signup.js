import React, { useCallback } from 'react'
import { useState } from "react";
import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
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
    console.log("signup")
    return async() => {
      if (username === "" || email === "" || password === "" || confirmPassword === ""){
        alert("必須項目が未入力です");
        console.log("必須項目が未入力です");
        return false
      }

      else if (password !== confirmPassword){
        alert("パスワードが一致しません")
        return false
      }else{
        return createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
          const user = userCredential.user;
          const usersCollectionRef = collection(db, "Users");
          addDoc(usersCollectionRef, { name:username, id:user.uid});
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          console.log("signup succeed");
        })
        .catch((error) => {
          alert(error.code);
        })
      }
    }
  }

  //add_teamのhooks
  // const [newTeamName, setNewTeamName] = useState("");
  // const [newCount, setNewCount] = useState(0);
  // const [newPlace, setNewPlace] = useState("");
  // const [newCaptain, setNewCaptain] = useState("");
  // const [userId,setUserId] = useState("");

  // const gamesCollectionRef = collection(db, "Teams");
  // onAuthStateChanged(auth,(user)=>{
  //   if(user){
  //     const uid = user.uid;
  //     setUserId(uid);
  //   }
  // })


  // const createTeam = async () => {
  //   await addDoc(gamesCollectionRef, { name: newTeamName, place: newPlace, count: Number(newCount), captain: newCaptain, id: userId});
  //   setNewTeamName("");
  //   setNewCount("");
  //   setNewPlace("");
  //   setNewCaptain("");
  //   console.log("add team succeed");
  // };
  return(
    <div className='form_outline'>
      <Card className='form_groups'>
        <Card.Body>
          <Card.Title className='signup_title'>
            Sign Up
          </Card.Title>
          <div className='form-group'>
            <label>User Name</label>
            <input className='form-control' placeholder="Username" value={username} onChange={inputUsername}/>
          </div>

          <div className='form-group'>
              <label>Email</label>
              <input type="email" className='form-control' placeholder="Enter email" value={email} onChange={inputEmail}/>
          </div>

          <div className='form-group'>
              <label>Password</label>
              <input type="password" className='form-control' placeholder="Enter password" value={password} onChange={inputPassword}/>
          </div>

          <div className='form-group'>
              <label>Password（Confirm）</label>
              <input type="password" className='form-control' placeholder="Enter password (Confirm)" value={confirmPassword} onChange={inputConfirmPassword}/>
          </div>
        </Card.Body>
      </Card>
      {/* <Card className='add_team_card'>
        <Card.Body>
          <Card.Title className='create_game_post_title'>Team Register</Card.Title>
          <div className='form-group'>
            <label>Team name</label>
            <input
              className='form-control'
              placeholder="Team name..."
              value={newTeamName}
              onChange={(event) => {
                setNewTeamName(event.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>Home Stadium</label>
            <input
              className='form-control'
              placeholder="Home Place..."
              value={newPlace}
              onChange={(event) => {
                setNewPlace(event.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>Amount of Team Member</label>
            <input
              className='form-control'
              type="number"
              placeholder="Count..."
              value={newCount}
              onChange={(event) => {
                setNewCount(event.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>Representative</label>
            <input
              className='form-control'
              placeholder="Representative"
              value={newCaptain}
              onChange={(event) => {
                setNewCaptain(event.target.value);
              }}
            />
          </div>
        </Card.Body> */}
        <form>
          <Button
            onClick={
              // createTeam();
              Signup(username,email,password,confirmPassword)
            }>
            Start Sandlot
          </Button>
        </form>
      {/* </Card> */}
    </div>
  )
};

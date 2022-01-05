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
import { AddTeam } from '../add_teams/add_team';


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
  //add_teamのhooks
  const [newTeamName, setNewTeamName] = useState("");
  const [newCount, setNewCount] = useState(0);
  const [newPlace, setNewPlace] = useState("");
  const [newCaptain, setNewCaptain] = useState("");
  const [userId,setUserId] = useState("");

  const gamesCollectionRef = collection(db, "Teams");
  onAuthStateChanged(auth,(user)=>{
    if(user){
      const uid = user.uid;
      setUserId(uid);
    }
  })


  const createTeam = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, place: newPlace, count: Number(newCount), captain: newCaptain, userid:userId});
  };
  return(
    <div className='form_outline'>
      <Card className='form_groups'>
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
      </Card>
      <Card className='add_team_card'>
        <Card.Body>
          <Card.Title className='create_game_post_title'>Team Register</Card.Title>
          <div className='form-group'>
            <label>Team name</label>
            <input
              className='form-control'
              placeholder="Team name..."
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
              onChange={(event) => {
                setNewCaptain(event.target.value);
              }}
            />
          </div>
        </Card.Body>
        <form>
          <Button onClick={createTeam} onClick = {(username,email,password,confirmPassword) => {
              Signup(username,email,password,confirmPassword);
            }}>
            Start Sandlot
          </Button>
        </form>
      </Card>
    </div>
  )
};

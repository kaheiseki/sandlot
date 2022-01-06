import React from 'react'
import { useState} from "react";
import { db } from "../../firebase";
import {
  setDoc,
  doc,
} from "firebase/firestore";
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap';
import './add_team.css';
import { useNavigate } from 'react-router-dom';

export const AddTeam = () => {

  const [newTeamName, setNewTeamName] = useState("");
  const [newCount, setNewCount] = useState(0);
  const [newPlace, setNewPlace] = useState("");
  const [newCaptain, setNewCaptain] = useState("");
  const [userId,setUserId] = useState(" ");
  const navigate = useNavigate();

  onAuthStateChanged(auth,(user)=>{
    if(user){
      const uid = user.uid;
      setUserId(uid);
    }
  })

  const teamsDocumentRef = doc(db, "Teams", userId);
  const createTeam = async () => {
    await setDoc(teamsDocumentRef, { name: newTeamName, place: newPlace, count: Number(newCount), captain: newCaptain, userid:userId});
    navigate("/",{replace:true})
  };
  return(
    <div className='form_outline'>
      <Card className='add_team_card_outline'>
        <Card.Body>
          <Card.Title className='form_title'>
            Team Info
          </Card.Title>
          <div className='form-group'>
            <label>Team Name</label>
            <input
              className='form-control'
              placeholder="Team name..."
              onChange={(event) => {
                setNewTeamName(event.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>Home Ground</label>
            <input
              className='form-control'
              placeholder="Home Ground..."
              onChange={(event) => {
                setNewPlace(event.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>Email address</label>
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
            <label>Email address</label>
            <input
              className='form-control'
              placeholder="Representative"
              onChange={(event) => {
                setNewCaptain(event.target.value);
              }}
            />
          </div>
          <form>
            <Button className='form_button' onClick={() => createTeam()}>
                Create team
            </Button>
          </form>
        </Card.Body>
      </Card>


    </div>

  );
}
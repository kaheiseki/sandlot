import React from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '../../firebase'
import { collection,getDocs,query,where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import {Card,Button} from 'react-bootstrap';
import { unstable_batchedUpdates } from 'react-dom'

export const MyTeam = () => {

  const [uid,setUid] = useState("");
  const [teamname,setTeamname] = useState("");
  const [place,setPlace] = useState("");
  const [count,setCount] = useState(0);
  const [captain,setCaptain] = useState("");
  onAuthStateChanged(auth,async (user) => {
    if(user){
      setUid(user.uid);
      const q = query(collection(db, "Teams"),where("userid","==",uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        setTeamname(doc.data().name);
        setPlace(doc.data().place);
        setCount(doc.data().count);
        setCaptain(doc.data().captain);
      });
    }
  })

  const upDate = ()=>{

  }

  return (
    <div>
    <Card className='add_team_card'>
        <Card.Body>
          <Card.Title className='create_game_post_title'>My team</Card.Title>
          <input
            className='form-control'
            defaultValue={teamname}
            onChange={(event) => {
              setTeamname(event.target.value);
            }}
          />
          <input
            className='form-control'
            defaultValue = {place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
          <input
            className='form-control'
            type="number"
            defaultValue = {count}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />
          <input
            className='form-control'
            defaultValue={captain}
            onChange={(event) => {
              setCaptain(event.target.value);
            }}
          />
        </Card.Body>
        <form>
          <Button onClick={() => upDate()}>
              Update team
          </Button>
        </form>
      </Card>
    </div>
  )
}

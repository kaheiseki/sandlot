import React from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '../../firebase'
import { collection,getDocs,query,where,doc,updateDoc} from 'firebase/firestore'
import { useState } from 'react'
import {Card,Button} from 'react-bootstrap';
import './my_team.css';


export const MyTeam = () => {

  const [uid,setUid] = useState(" ");
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
  });

  const teamsDocumentRef = doc(db, "Teams", uid);
  const upDate = async () => {
    await updateDoc(teamsDocumentRef, {
      name: teamname,
      place: place,
      count: Number(count),
      captain: captain
    });
  };
  console.log(teamname);

  return (
    <div className='my_team_outline'>
      <Card className='my_team_card_outline'>
        <Card.Body>
          <Card.Title className='myteam_title'>
            My team
          </Card.Title>
          <div className='form-group'>
            <label>チーム名</label>
            <input
              className='form-control'
              defaultValue={teamname}
              onChange={(event) => {
                setTeamname(event.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>本拠地</label>
            <input
              className='form-control'
              defaultValue = {place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>メンバー数</label>
            <input
              className='form-control'
              type="number"
              defaultValue = {count}
              onChange={(event) => {
                setCount(event.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>代表者</label>
            <input
              className='form-control'
              defaultValue={captain}
              onChange={(event) => {
                setCaptain(event.target.value);
              }}
            />
          </div>
          <form>
            <Button className='myteam_button' onClick={() => upDate()}>
                Update team
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}

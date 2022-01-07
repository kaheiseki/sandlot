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
    setIsEdit(false);
    await updateDoc(teamsDocumentRef, {
      name: teamname,
      place: place,
      count: Number(count),
      captain: captain
    });
  };
  console.log(teamname);
  //タップしたら編集できるようにするための記述
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
    console.log("edit pushed")
    console.log(setIsEdit)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);
  }
  const handleBlur = () => {
    setIsEdit(false);
  }


  return (
    <div className='my_team_outline'>
      <Card className='my_team_card_outline'>
        <Card.Body>
          <Card.Title className='myteam_title'>
            My team
          </Card.Title>
          {isEdit ? (
            <div>
              <div className='form-group'>
                <label>チーム名</label>
                <p>{teamname}</p>
                </div>
                <div className='form-group'>
                  <label>本拠地</label>
                  <p>{place}</p>
                </div>
                <div className='form-group'>
                  <label>メンバー数</label>
                  <p>{count}</p>
                </div>
                <div className='form-group'>
                  <label>代表者</label>
                  <p>{captain}</p>
              </div>
            </div>
          ) : (
            <div>
              <div className='form-group'>
                <label>チーム名</label>
                <input
                  className='form-control'
                  defaultValue={teamname}
                  // onBlur={handleBlur}
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
            </div>
          )}
          {isEdit ? (
            <form>
              <Button className='update_button' onClick={() => upDate()}>
                  Update team
              </Button>
            </form>
          ) : (
            <form>
              <Button className='edit_button' onClick={() => handleEdit()}>
                  Edit
              </Button>
            </form>
          )}

        </Card.Body>
      </Card>
    </div>
  )
}

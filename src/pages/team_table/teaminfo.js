import React from "react";
import { useState, useEffect } from "react";
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './teaminfo.css';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";

const TeamInfo = () => {
  const [teams, setTeams] = useState([]);
  const teamsCollectionRef = collection(db, "Teams");
  const getTeams = async () => {
    const data = await getDocs(teamsCollectionRef);
    setTeams(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getTeams();
  },[]);

  onAuthStateChanged(auth,(user) => {
    if(user){
      alert("ログインしています");
    }else{
      // alert("ログインしていません");
    }
  })

  return(
    <div>
      <div className="gameInfoTitle">
        チーム一覧
      </div>
      <div className="container">
        {teams.map((team) => {
          return (
            <div className="infolist">
              <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
                <Card.Body>
                  <Card.Title>{team.name}</Card.Title>
                  <Card.Text>チーム人数: {team.count}</Card.Text>
                  <Card.Text>場所: {team.place}</Card.Text>
                </Card.Body>
                <Button variant="primary" style = {{width:"120px"}}>詳細を見る</Button>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamInfo;
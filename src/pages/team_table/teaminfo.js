import React from "react";
import { useState, useEffect } from "react";
import {Card,Button, Modal} from 'react-bootstrap';
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

  // modalに関するhooks
  const [show, setShow] = useState(false);
  const [indexContent, setIndexContent] = useState(0);

  const handleClose = ()=> setShow(false);
  const handleShow = (index)=> {
    setShow(true);
    setIndexContent(index);
  }

  return(
    <div>
      <div className="gameInfoTitle">
        Team List
      </div>
      <div className="container">
        {teams.map((team,index) => {
          return (
            <div>
              <div className="infolist">
                <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
                  <Card.Body>
                    <Card.Title>{team.name}</Card.Title>
                    <Card.Text>メンバー数: {team.count}</Card.Text>
                    <Card.Text>場所: {team.place}</Card.Text>
                  </Card.Body>
                  <Button style = {{width:"120px"}} onClick={()=>handleShow(index)}>詳細を見る</Button>
                </Card>
              </div>
              {/* modalについての記述 */}
              <div>
                <Modal show={show} onHide={handleClose} team={team}>
                  <Modal.Header closeButton>
                    <Modal.Title>{teams[indexContent].name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>メンバー数：{teams[indexContent].count}</p>
                    <p>本拠地：{teams[indexContent].place}</p>
                    <p>代表者：{teams[indexContent].captain}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={()=>handleClose()}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamInfo;
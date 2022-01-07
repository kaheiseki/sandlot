import React from 'react'
import { useState} from "react";
import { db,auth } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc
} from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap';
import './create_game_post.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';




export const CreateGamePost = () => {
  const [newTeamName, setNewTeamName] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newGameDate, setNewGameDate] = useState("");
  // 本来date型でデータを収集したいが、一旦ただの数値で格納
  const [newGameTime, setNewGameTime] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newHelper, setNewHelper] = useState("");
  const [userId,setUserId] = useState(" ");

  const gamesCollectionRef = collection(db, "Games");

  onAuthStateChanged(auth,async(user)=>{
    if(user){
      const uid = user.uid;
      setUserId(uid);
      const teamsDocumentRef = doc(db,"Teams",userId);
      const docSnap = await getDoc(teamsDocumentRef);
      if(docSnap){
        setNewTeamName(docSnap.data().name);
        console.log(docSnap.data())
        // エラー出てる
      }
    }
  })

  const createGame = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, date: newGameDate, time: newGameTime, place: newPlace, count: Number(newCount), cost: newCost, helper: newHelper });
    // フォーム送信後中身を空にする処理（まだうまくいってない）
    //数字型の中身をからにできてない
    setNewCount("");
    setNewTeamName("");
    setNewPlace("");
    // setNewHelper(null);
    // setNewGameDate(null);
    // setNewGameTime(null);
    // setNewCost(null);
  };

  const navigate = useNavigate();


  return (
    <div className='form_outline'>
      <Card className="post_game_card_outline">
        <Card.Body>
          <Card.Title className='post_game_title'>
            Make a Game
          </Card.Title>
          <div className='form-group'>
            <label>日時</label>
            <input
              className='form-control'
              type="date"
              placeholder="Date: ex)20220120"
              onChange={(event) => {
                setNewGameDate(event.target.value);
              }}
              value={newGameDate}
            />
          </div>
          <div className='form-group'>
            <label>集合時刻</label>
            <input
              className='form-control'
              type="time"
              placeholder="Playball Time: ex)15:00"
              onChange={(event) => {
                setNewGameTime(event.target.value);
              }}
              defaultValue={newGameTime}
            />
          </div>
          <div className='form-group'>
            <label>集合場所</label>
            <input
              className='form-control'
              onChange={(event) => {
                setNewPlace(event.target.value);
              }}
              value={newPlace}
            />
          </div>
          <div className='form-group'>
            <label>参加人数</label>
            <input
              className='form-control'
              type="number"
              onChange={(event) => {
                setNewCount(event.target.value);
              }}
              value={newCount}
            />
          </div>
          <div className='form-group'>
            <label>費用</label>
            <input
              className='form-control'
              type="number"
              onChange={(event) => {
                setNewCost(event.target.value);
              }}
              value={newCost}
            />
          </div>
          <div className='form-group'>
            <label>募集人数</label>
            <input
              className='form-control'
              onChange={(event) => {
                setNewHelper(event.target.value);
              }}
              value={newHelper}
            />
          </div>
          <form>
            <Button className='post_game_button' onClick={()=>{createGame();
            navigate("/",{replace:true})}} autoFocus>
              {/* autoFocusしたい */}
                Create Game
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
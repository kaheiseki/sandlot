import React from "react";
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./gameinfo.css"

const GameInfo = () => {
  let a = 1;
  return(
    <div>
      <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
      <Card.Body>
        <Card.Title>募集チーム</Card.Title>
        <Card.Text>
        日時:
        </Card.Text>
        <Card.Text>
        場所:
        </Card.Text>
      </Card.Body>
      <Button variant="primary" style = {{width:"120px"}}>詳細を見る</Button>
      </Card>
    </div>
  );
}

export default GameInfo;
import React from "react";
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeamInfo = () => {
  return(
    <div>
      <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
      <Card.Body>
        <Card.Title>チーム名</Card.Title>
        <Card.Text>
          メンバー数
        </Card.Text>
        <Card.Text>
          主な活動場所
        </Card.Text>
      </Card.Body>
      </Card>
    </div>
  );
}

export default TeamInfo;
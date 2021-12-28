import React from 'react'
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
} from "../firebase/firestore";

export const CreateGamePost = () => {
  const [newTeamName, setNewTeamName] = useState("");
  const [newCount, setNewCount] = useState(0);

  const gamesCollectionRef = collection(db, "Games");

  const createGame = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, count: Number(Count) });
  };

  return (
    <div className='CreateGamePost'>
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewTeamName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Count..."
        onChange={(event) => {
          setNewCount(event.target.value);
        }}
      />

    <button onClick={createGame}>Create Game</button>

    </div>
  );
}

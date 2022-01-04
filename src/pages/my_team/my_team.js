import React from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '../../firebase'
import { collection,getDocs,updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'

export const MyTeam = () => {
  const [teamname,setTeamname] = useState("");
  const user = auth.currentUser;
  const teamsCollectionRef = collection(db, "Teams");
  const getMyTeam = async () => {
    const data = await getDocs(teamsCollectionRef).where("userid","==",user.uid);
    setTeamname(data.name);
  };
  useEffect(() => {
    getMyTeam();
  },[]);

  return (
    <div>
    {teamname}
      This is my team page.
      チーム削除機能
    </div>
  )
}

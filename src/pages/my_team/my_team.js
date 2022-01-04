import React from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '../../firebase'
import { collection,getDocs,updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'

export const MyTeam = () => {
  const [teamname,setTeamname] = useState("");
  onAuthStateChanged(auth,(user) => {
    if(user){
      const uid = user.uid;
      console.log(uid)
    }
  })

  return (
    <div>
    {teamname}
      This is my team page.
      チーム削除機能
    </div>
  )
}

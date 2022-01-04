import React from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '../../firebase'
import { collection,getDocs,query,where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'

export const MyTeam = () => {

  const [username,setUsername] = useState("");
  onAuthStateChanged(auth,async (user) => {
    if(user){
      const uid = user.uid;
      const email = user.email;
      const q = query(collection(db, "Users"),where("id","==",uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        setUsername(doc.data().name);
        console.log(username);
      });
    }
  })

  return (
    <div>
    {username}
      This is my team page.
      チーム削除機能
    </div>
  )
}

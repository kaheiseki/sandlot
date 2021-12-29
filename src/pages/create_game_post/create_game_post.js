import React from 'react'
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap';
import './create_game_post.css';




export const CreateGamePost = () => {
  const [newTeamName, setNewTeamName] = useState("");
  const [newCount, setNewCount] = useState(0);

  const [games, setGames] = useState([]);
  const gamesCollectionRef = collection(db, "Games");

  const createGame = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, count: Number(newCount) });
  };

  useEffect(() => {
    const getGames = async () => {
      const data = await getDocs(gamesCollectionRef);
      setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getGames();
  }, []);

  return (
    <div className='CreateGamePost'>
      <Card style={{ width: "40rem" , height:"15rem",borderRadius:"10px"}}>
        <Card.Body>
          <Card.Title className='createGamePostTitle'>募集ゲーム作成</Card.Title>
          <input
            className='form-control'
            placeholder="Name..."
            onChange={(event) => {
              setNewTeamName(event.target.value);
            }}
          />
          <input
            className='form-control'
            type="number"
            placeholder="Count..."
            onChange={(event) => {
              setNewCount(event.target.value);
            }}
          />
        </Card.Body>
        <Button variant="primary" style = {{width:"180px"}} onClick={createGame}>
            Create Game
        </Button>
      </Card>


    {games.map((game) => {
      return (
        <div>
          {" "}
          <h1>Team: {game.name}</h1>
          <h1>Member Count: {game.count}</h1>
        </div>
      );
    })}
    </div>
  );
}


// import { useState, useEffect } from "react";
// import "./App.css";
// import { db } from "./firebase-config";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// function App() {
//   const [newName, setNewName] = useState("");
//   const [newAge, setNewAge] = useState(0);

//   const [users, setUsers] = useState([]);
//   const usersCollectionRef = collection(db, "users");

//   const createUser = async () => {
//     await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
//   };

//   const updateUser = async (id, age) => {
//     const userDoc = doc(db, "users", id);
//     const newFields = { age: age + 1 };
//     await updateDoc(userDoc, newFields);
//   };

//   const deleteUser = async (id) => {
//     const userDoc = doc(db, "users", id);
//     await deleteDoc(userDoc);
//   };

//   useEffect(() => {
//     const getUsers = async () => {
//       const data = await getDocs(usersCollectionRef);
//       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     getUsers();
//   }, []);

//   return (
//     <div className="App">
//       <input
//         placeholder="Name..."
//         onChange={(event) => {
//           setNewName(event.target.value);
//         }}
//       />
//       <input
//         type="number"
//         placeholder="Age..."
//         onChange={(event) => {
//           setNewAge(event.target.value);
//         }}
//       />

//       <button onClick={createUser}> Create User</button>
//       {users.map((user) => {
//         return (
//           <div>
//             {" "}
//             <h1>Name: {user.name}</h1>
//             <h1>Age: {user.age}</h1>
//             <button
//               onClick={() => {
//                 updateUser(user.id, user.age);
//               }}
//             >
//               {" "}
//               Increase Age
//             </button>
//             <button
//               onClick={() => {
//                 deleteUser(user.id);
//               }}
//             >
//               {" "}
//               Delete User
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default App;
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState("");

  const getUsers = () => {
    Axios.get("http://localhost:8080/MealNUS-war/rest/User/retrieveAllUsers")
    .then((response) => {
      setUsers(response.data);
      console.log(response.data);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div>
        <h1>MealNUS</h1>
      <button onClick={getUsers}>Get Users</button>
      <p>{JSON.stringify(users.userEntities)}</p>
    </div> 
  );
}

export default App;

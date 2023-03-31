import Axios from 'axios';
import { useState } from 'react';

function RetrieveAllUsers() {
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
      <h1>MealNUS - LANDING BRANCH</h1>
      <button onClick={getUsers}>Get Users</button>
      <p>{JSON.stringify(users.userEntities)}</p>
    </div>
  );
} 

export default RetrieveAllUsers
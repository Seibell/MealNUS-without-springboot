import React, { useState } from 'react';

const UpdateQuantity = () => {
  const [mealBoxId, setmealBoxId] = useState('');
  const [quantityAvailable, setquantityAvailable] = useState(0);

  const handlemealBoxIdChange = (event) => {
    setmealBoxId(event.target.value);
  };

  const handlequantityChange = (event) => {
    setquantityAvailable(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    fetch(`http://localhost:8080/MealNUS-war/rest/Mealbox/updatemealboxQuantity/` + mealBoxId + `/`+ quantityAvailable , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quantityAvailable)
    });
    console.log(`http://localhost:8080/MealNUS-war/rest/Mealbox/updateorder/` + mealBoxId + `/`+ quantityAvailable);
    // Handle the response as necessary (e.g., update the UI)
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        MealBox Id:
        <input type="text" value={mealBoxId} onChange={handlemealBoxIdChange} />
      </label>
      <label>
        Quantity
        <input type="text" value={quantityAvailable} onChange={handlequantityChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateQuantity;

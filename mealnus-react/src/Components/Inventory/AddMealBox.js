import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom'


// mealBoxSessionBean.createMealBox(new MealBox("Vegetable's Party Box", 001L, new BigDecimal(7), new BigDecimal(12), "This is a vegetable mealBox", 15));


const AddMealBox = () => {

  const [itemName, setitemName] = useState('');
  const [itemCode, setitemCode] = useState(''); //Why is this capital? :/ i just copied the one in mealbox... is like this de
  const [itemCost, setitemCost] = useState('');
  const [itemPrice, setitemPrice] = useState('');
  const [itemDescription, setitemDescription] = useState('');
  const [quantityAvailable, setquantityAvailable] = useState('');
  const [success, setSuccess] = useState(false);

  //ingredients
  const [availableIngredients, setAvaivableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleNameChange = (event) => {
    setitemName(event.target.value);
  };

  const handleCodeChange = (event) => {
    setitemCode(event.target.value);
  };

  const handleCostChange = (event) => {
    setitemCost(event.target.value);
  };

  const handlePriceChange = (event) => {
    setitemPrice(event.target.value);
  };


  const handleDiscriptionChange = (event) => {
    setitemDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setquantityAvailable(event.target.value);
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();

    const Mealbox = {
      itemName,
      itemCode,
      itemCost,
      itemPrice,
      itemDescription,
      quantityAvailable,
      selectedIngredients
    }; // i think u need to create some mapping for id == name or make name unique or smth so it can be called by the json

    console.log(Mealbox)

    fetch('http://localhost:8080/MealNUS-war/rest/Mealbox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Mealbox)
    }).then((response) => {
      if (response.ok) {
        setSuccess(true)
      } else {
        throw new Error('Something went wrong');
      }
    });
  };

  const handleInputChange = (event, ingredient) => {
    if (event.target.checked) {
      setSelectedIngredients([
        ...selectedIngredients,
        { id: ingredient.ingredientId, name: ingredient.name },
      ]);
      console.log(selectedIngredients)
    } else {
      setSelectedIngredients(selectedIngredients.filter((item) => item.id !== ingredient.ingredientId))
    }
  };

  useEffect(() => {
    Axios.get(
      "http://localhost:8080/MealNUS-war/rest/Ingredient/retrieveAllIngredient"
    )
      .then((response) => {
        setAvaivableIngredients(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (success) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>
          MealBox Name:
          <input type="text" value={itemName} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          ItemCode:
          <input type="text" value={itemCode} onChange={handleCodeChange} />
        </label>
      </div>
      <div>
        <label>
          ItemCost:
          <input type="text" value={itemCost} onChange={handleCostChange} />
        </label>
      </div>
      <div>
        <label>
          ItemPrice:
          <input type="text" value={itemPrice} onChange={handlePriceChange} />
        </label>
      </div>
      <div>
        <label>
          Item Description:
          <input type="text" value={itemDescription} onChange={handleDiscriptionChange} />
        </label>
      </div>
      <div>
        <label>
          Item Quantity:
          <input type="text" value={quantityAvailable} onChange={handleQuantityChange} />
        </label>
      </div>
      {availableIngredients.map((ingredient) => (
        <div key={ingredient.ingredientId}>
          <label>
            <input
              type="checkbox"
              value={ingredient}
              onChange={(event) => handleInputChange(event, ingredient)}
            />
            {ingredient.name}
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
export default AddMealBox; 
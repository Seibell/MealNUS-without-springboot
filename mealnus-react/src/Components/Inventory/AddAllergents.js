import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const AddAllergents = () => {
  const [allergenDescription, setallergenDescription] = useState('');
  const [allergenName, setallergenName] = useState('');

  const handleNameChange = (event) => {
    setallergenName(event.target.value);
  };

  const handleDescChange = (event) => {
    setallergenDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const Allergen = { allergenName, allergenDescription }

    fetch('http://localhost:8080/MealNUS-war/rest/Allergen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Allergen)
    });

    console.log(Allergen);
    // Handle the response as necessary (e.g., update the UI)
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleFormSubmit}>
        <label>
          Allergen Name:
          <input type="text" value={allergenName} onChange={handleNameChange} />
        </label>
        <label>
          Allergen Description
          <input type="text" value={allergenDescription} onChange={handleDescChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <a href="/inventoryhome">Inventory Home</a>
      </div>
    </ThemeProvider>
  );
};

export default AddAllergents;

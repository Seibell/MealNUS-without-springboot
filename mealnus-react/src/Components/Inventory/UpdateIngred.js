import React, { useState } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const API_KEY = '995621471943455';
const default_image_url = 'https://i.imgur.com/Kvyecsm.png';
const theme = createTheme();

const UploadForm = () => {
  //TEMP
  const [ingredientId, setingredientId] = useState('');
  const [picture, setpicture] = useState(null);
  const [name, setname] = useState('');
  const [error, setError] = useState("");
    
  const handleIdChange = (event) => {
    setingredientId(event.target.value);
  };

  const handleNameChange = (event) => {
    setname(event.target.value);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mealnus');
    formData.append('api_key', API_KEY);

    try {
        console.log(formData);
        const response = await axios.post('https://api.cloudinary.com/v1_1/drkpzjlro/image/upload', formData);
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error.response?.data?.error || error.message);
        return null;
    }
};

const handleFileChange = async (e) => {
  if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      //setpicture(event.target.files[0]);
      const uploadedImageURL = await uploadImage(file);
      
      if (uploadedImageURL) {
        setpicture(uploadedImageURL);
      } else {
          setError("Failed to upload image");
      }
  }
};

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const Ingredient = {name , picture}
    
    fetch('http://localhost:8080/MealNUS-war/rest/Ingredient/updateIngredient/' + ingredientId ,
     {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Ingredient)
    });

    console.log(Ingredient);
    // Handle the response as necessary (e.g., update the UI)
  };

  return (
    <form onSubmit={handleFormSubmit}>
       <label>
        Ingredient Id:
        <input type="text" value={ingredientId} onChange={handleIdChange} />
      </label>
      <label>
        Ingredient Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Upload an image:
        <input  accept="image/*"
           type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadForm;

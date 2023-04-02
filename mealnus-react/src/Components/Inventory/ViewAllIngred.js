import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Ingredient = () => {
  const [ingred, setIngred] = useState([]);

  useEffect(() => {
    Axios.get(
      " http://localhost:8080/MealNUS-war/rest/Ingredient/retrieveAllIngredient"
    )
      .then((response) => {
        setIngred(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <ImageList sx={{ width: '50%', height: '50%' }}>
        {ingred.map((item) => (
          <ImageListItem key={item.picture}>
            <img
              src={`${item.picture}?w=248&fit=crop&auto=format`}
              srcSet={`${item.picture}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={<span>Ingredient Id: {item.ingredientId}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <a href="/inventoryhome">Inventory Home</a>
    </ThemeProvider>
  );
}

export default Ingredient;
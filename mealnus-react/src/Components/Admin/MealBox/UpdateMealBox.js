import * as React from 'react';
import { useState, useEffect } from 'react';
import MUILink from '@mui/material/Link';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import { useContext } from "react";
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from "@mui/material";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            MealNUS
            {' '}
            {new Date().getFullYear()}
            {' (UEN: 54231804G).'} All rights reserved.
            <p>Computing 1 (COM1), 13 Computing Drive. Singapore 117417</p>
        </Typography>
    );
}

const API_KEY = '995621471943455';
const default_image_url = 'https://i.imgur.com/Kvyecsm.png';


function UpdateMealBox(props) {
    const { currentStaff } = useContext(AdminAuthContext);

    const { mealBoxId } = useParams();
    const [retrieved, setretrieved] = useState({});
    const [uploading, setUploading] = useState(false);

    const [itemName, setitemName] = useState('');
    const [itemCode, setitemCode] = useState(''); // Why is this capital? :/ i just copied the one in mealbox... is like this de
    const [itemCost, setitemCost] = useState('');
    const [itemImage, setitemImage] = useState(null);
    const [itemPrice, setitemPrice] = useState('');
    const [itemDescription, setitemDescription] = useState('');
    const [quantityAvailable, setquantityAvailable] = useState('');
    const [success, setSuccess] = useState(false);

    const [query, setQuery] = useState('');
    const [cquery, setcQuery] = useState('');
    const [aquery, setaQuery] = useState('');

    const [open, setOpen] = React.useState(true);

    const [error, setError] = useState("");

    const mdTheme = createTheme();

    const uploadImage = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mealnus');
        formData.append('api_key', API_KEY);

        try {
            console.log(formData);
            const response = await Axios.post('https://api.cloudinary.com/v1_1/drkpzjlro/image/upload', formData);
            setUploading(false);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error.response?.data?.error || error.message);
            setUploading(false);
            return null;
        }
    };

    const handleFileChange = async (e) => {

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            //setpicture(event.target.files[0]);
            const uploadedImageURL = await uploadImage(file);

            if (uploadedImageURL) {
                setitemImage(uploadedImageURL);
                setitemImage(itemImage);
            } else {
                setError("Failed to upload image");
            }
        }
    };

    //ingredients
    const [availableIngredients, setAvaivableIngredients] = useState([]);
    const [ingredients, setSelectedIngredients] = useState([]);


    //Category
    const [availableCategories, setavailableCategories] = useState([]);
    const [categories, setSelectedCategories] = useState([]);

    //Allergen
    const [availableAllergens, setavailableAllergens] = useState([]);
    const [allergens, setSelectedAllergens] = useState([]);

    const navigate = useNavigate();

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


    const handleDescriptionChange = (event) => {
        setitemDescription(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setquantityAvailable(event.target.value);
    };

    //search filter
    const filteredData = availableIngredients.filter(
        (ingredient) =>
            ingredient.name.toLowerCase().includes(query.toLowerCase())
        //console.log(availableIngredients)
    );

    //search filter
    const filteredcategory = availableCategories.filter(
        (category) =>
            category.name.toLowerCase().includes(cquery.toLowerCase())
        //console.log(availableIngredients)
    );
    //search filter
    const filteredallergen = availableAllergens.filter(
        (allergen) =>
            allergen.allergenName.toLowerCase().includes(aquery.toLowerCase())
        //console.log(availableIngredients)
    );

    const handleInputChange = (event, ingredient) => {
        if (event.target.checked) {
            setSelectedIngredients([
                ...ingredients,
                { ingredientId: ingredient.ingredientId, name: ingredient.name, picture: ingredient.picture },
            ]);
            console.log(ingredients)
        } else {
            setSelectedIngredients(ingredients.filter((item) => item.ingredientId !== ingredient.ingredientId))
        }
    };

    const handleCategoryChange = (event, category) => {
        if (event.target.checked) {
            setSelectedCategories([
                ...categories,
                { categoryId: category.categoryId, name: category.name, picture: category.picture },
            ]);
            console.log(categories)
        } else {
            setSelectedCategories(categories.filter((item) => item.categoryId !== category.categoryId))
        }
    };

    const handleallergenChange = (event, allergen) => {
        if (event.target.checked) {
            setSelectedAllergens([
                ...allergens,
                { allergenId: allergen.allergenId, allergenName: allergen.allergenName, allergenDescription: allergen.allergenDescription },
            ]);
            console.log(allergens)
        } else {
            setSelectedAllergens(allergens.filter((item) => item.allergenId !== allergen.allergenId))
        }
    };

    const checkIfIngredientExisit = (ingredients, ingredient) => {

        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].ingredientId == ingredient.ingredientId) {
                return true;
            }
        }
        return false;
    }

    const checkIfcategoryExisit = (categories, category) => {

        for (let i = 0; i < categories.length; i++) {
            if (categories[i].categoryId == category.categoryId) {
                return true;
            }
        }
        return false;
    }

    const checkIfallergenExisit = (allergens, allergen) => {

        for (let i = 0; i < allergens.length; i++) {
            if (allergens[i].allergenId == allergen.allergenId) {
                return true;
            }
        }
        return false;
    }


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const Mealbox = {
            itemName,
            itemCode,
            itemCost,
            itemImage,
            itemPrice,
            itemDescription,
            quantityAvailable,
            allergens,
            ingredients,
            categories
        }; // i think u need to create some mapping for id == name or make name unique or smth so it can be called by the json

        //console.log(Mealbox)

        fetch(`http://localhost:8080/MealNUS-war/rest/Mealbox/updatemealbox/` + mealBoxId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Mealbox)
        })
            .then((response) => {
                window.opener.location.reload();
                navigate(window.close());
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(Mealbox);
    }

    //RETRIEVE MEALBOX BY ID
    //console.log("MID" + mealBoxId);
    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Mealbox/" + mealBoxId
        )
            .then(response => {
                const retrieved = response.data;
                setretrieved(retrieved);
                setitemName(retrieved.itemName);
                setitemCode(retrieved.itemCode);
                setitemCost(retrieved.itemCost);
                setitemImage(retrieved.itemImage);
                setitemPrice(retrieved.itemPrice);
                setitemDescription(retrieved.itemDescription);
                setquantityAvailable(retrieved.quantityAvailable);
                setSelectedIngredients(retrieved.ingredients);
                setSelectedCategories(retrieved.categories);
                setSelectedAllergens(retrieved.allergens);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(categories);

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

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Category/retrieveAllCategories"
        )
            .then((response) => {
                setavailableCategories(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Allergen/retrieveAllAllergent"
        )
            .then((response) => {
                setavailableAllergens(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (success) {
        return <navigate to="/adminmealboxes" />;
    }

    const headerLabel = "Update MealBox";


    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">{headerLabel}</h4>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className="card-body">

                            <div className="form-group">
                                <label htmlFor="inputName">MealBox</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={itemName}
                                    onChange={handleNameChange}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="image">Upload Image</label>
                                <input
                                    id="image"
                                    required
                                    className="form-control"
                                    accept="image/*"
                                    type="file" onChange={handleFileChange}
                                />
                                {uploading && (
                                    <CircularProgress
                                        sx={{
                                            position: "absolute",
                                            top: "42%",
                                            left: "43%",
                                        }}
                                    />
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputName">Item Code</label>
                                <input
                                    id="inputCode"
                                    required
                                    className="form-control"
                                    value={itemCode}
                                    onChange={handleCodeChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Item Cost</label>
                                <input
                                    id="inputCost"
                                    required
                                    className="form-control"
                                    value={itemCost}
                                    onChange={handleCostChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Item Price</label>
                                <input
                                    id="inputPrice"
                                    required
                                    className="form-control"
                                    value={itemPrice}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Item Description</label>
                                <input
                                    id="inputDescription"
                                    required
                                    className="form-control"
                                    value={itemDescription}
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Quantity</label>
                                <input
                                    id="inputQuantity"
                                    required
                                    className="form-control"
                                    value={quantityAvailable}
                                    onChange={handleQuantityChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputName">Ingredients</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                    />
                                    <div style={{ maxHeight: '150px', maxWidth: '200px', overflowY: 'scroll' }}>
                                        <table>
                                            <thead>
                                                <tr>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.map((ingredient) => (
                                                    <tr key={ingredient.ingredientId}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                value={ingredient}
                                                                checked={checkIfIngredientExisit(ingredients, ingredient)}
                                                                onChange={(e) => {
                                                                    console.log(ingredient);
                                                                    console.log(ingredients.includes(ingredient))
                                                                    console.log(ingredients);
                                                                    if (e.target.checked) {
                                                                        setSelectedIngredients([
                                                                            ...ingredients,
                                                                            { ingredientId: ingredient.ingredientId, name: ingredient.name, picture: ingredient.picture },
                                                                        ]);
                                                                    } else {
                                                                        setSelectedIngredients(ingredients.filter((item) => item.ingredientId !== ingredient.ingredientId))
                                                                    }
                                                                }

                                                                }
                                                            />
                                                            {ingredient.name}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="inputName">Allergens</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={aquery}
                                        onChange={(event) => setaQuery(event.target.value)}
                                    />
                                    <div style={{ maxHeight: '150px', maxWidth: '200px', overflowY: 'scroll' }}>
                                        <table>
                                            <thead>
                                                <tr>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredallergen.map((allergen) => (
                                                    <tr key={allergen.allergenId}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                value={allergen}
                                                                checked={checkIfallergenExisit(allergens, allergen)}
                                                                onChange={
                                                                    (e) => {
                                                                        console.log(allergen);
                                                                        console.log(allergens.includes(allergen))
                                                                        console.log(allergens);
                                                                        if (e.target.checked) {
                                                                            setSelectedAllergens([
                                                                                ...allergens,
                                                                                { allergenId: allergen.allergenId, allergenName: allergen.allergenName, allergenDescription: allergen.allergenDescription },
                                                                            ]);
                                                                            console.log(allergens)
                                                                        } else {
                                                                            setSelectedAllergens(allergens.filter((item) => item.allergenId !== allergen.allergenId))
                                                                        }
                                                                    }
                                                                } />
                                                            {allergen.allergenName}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>





                            <div className="form-group">
                                <label htmlFor="inputName">Categories</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={cquery}
                                        onChange={(event) => setcQuery(event.target.value)}
                                    />
                                    <div style={{ maxHeight: '150px', maxWidth: '200px', overflowY: 'scroll' }}>
                                        <table>
                                            <thead>
                                                <tr>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredcategory.map((category) => (
                                                    <tr key={category.categoryId}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                value={category}
                                                                checked={checkIfcategoryExisit(categories, category)}
                                                                onChange={
                                                                    (e) => {
                                                                        console.log(categories);
                                                                        if (e.target.checked) {
                                                                            setSelectedCategories([
                                                                                ...categories,
                                                                                { categoryId: category.categoryId, name: category.name, picture: category.picture },
                                                                            ]);
                                                                        } else {
                                                                            setSelectedCategories(categories.filter((item) => item.categoryId !== category.categoryId))
                                                                        }
                                                                    }
                                                                } />
                                                            {category.name}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <RouterLink to="/adminmealboxes" className="btn btn-default" onClick={(e) => window.close()}>
                                Cancel
                            </RouterLink>
                            <button className="btn btn-primary float-right" type="submit" style={{ backgroundColor: "orange", border: "orange" }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Copyright sx={{ pt: 4 }} />
        </div>
    );
}

export default function AdminMealBoxes() {
    return <UpdateMealBox />;
}
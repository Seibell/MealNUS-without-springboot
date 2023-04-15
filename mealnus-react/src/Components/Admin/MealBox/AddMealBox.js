import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AdminAuthContext } from "../../../Context/AdminAuthContext";

import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";

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


function AddMealBox(props) {
    const { currentStaff } = useContext(AdminAuthContext);

    const [uploading, setUploading] = useState(false);
    const [itemName, setitemName] = useState('');
    const [itemCode, setitemCode] = useState(''); //Why is this capital? :/ i just copied the one in mealbox... is like this de
    const [itemCost, setitemCost] = useState('');
    const [itemPrice, setitemPrice] = useState('');
    const [itemDescription, setitemDescription] = useState('');
    const [quantityAvailable, setquantityAvailable] = useState('');
    const [success, setSuccess] = useState(false);
    const [itemImage, setitemImage] = useState('');
    const [query, setQuery] = useState('');
    const [cquery, setcQuery] = useState('');
    const [aquery, setaQuery] = useState('');

    const [open, setOpen] = React.useState(true);

    const mdTheme = createTheme();

    //ingredients
    const [availableIngredients, setAvaivableIngredients] = useState([]);
    const [ingredients, setSelectedIngredients] = useState([]);


    //Category
    const [availableCategory, setavailableCategory] = useState([]);
    const [categories, setCategory] = useState([]);

    //Allergen
    const [availableAllergens, setavailableAllergens] = useState([]);
    const [allergens, setAllergens] = useState([]);


    const navigate = useNavigate();
    const theme = createTheme();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [dateTime, setDateTime] = useState(new Date());

    const handleNameChange = (event) => {
        setitemName(event.target.value);
    };

    const handleCodeChange = (event) => {
        setitemCode(event.target.value);
    };

    const handleitemImage = (event) => {
        setitemImage(event.target.value);
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
    const filteredcategory = availableCategory.filter(
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
            setCategory([
                ...categories,
                { categoryId: category.categoryId, name: category.name, picture: category.picture },
            ]);
            console.log(categories)
        } else {
            setCategory(categories.filter((item) => item.categoryId !== category.categoryId))
        }
    };

    const handleallergenChange = (event, allergen) => {
        if (event.target.checked) {
            setAllergens([
                ...allergens,
                { allergenId: allergen.allergenId, allergenName: allergen.allergenName, allergenDescription: allergen.allergenDescription },
            ]);
            console.log(allergens)
        } else {
            setAllergens(allergens.filter((item) => item.allergenId !== allergen.allergenId))
        }
    };

    const [error, setError] = useState("");

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
            setError('Error uploading image:', error.response?.data?.error || error.message);
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
            } else {
                setError("Failed to upload image");
            }
        }
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const Mealbox = {
            itemName,
            itemCode,
            itemImage,
            itemCost,
            itemPrice,
            itemDescription,
            quantityAvailable,
            allergens,
            ingredients,
            categories
        }; // i think u need to create some mapping for id == name or make name unique or smth so it can be called by the json

        console.log(Mealbox)

        fetch('http://localhost:8080/MealNUS-war/rest/Mealbox', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Mealbox)
        }).then((response) => {
            window.opener.location.reload();
            navigate(window.close());
        })
            .catch((error) => {
                setError("Item code must be unique"); //This is the only case mealbox creation fails
                console.error(error);
            });

        console.log(Mealbox);
    };

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Ingredient/retrieveAllIngredient"
        )
            .then((response) => {
                setAvaivableIngredients(response.data)
            })
            .catch((err) => {
                setError("Failed to retrieve ingredients");
            });
    }, []);

    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Category/retrieveAllCategories"
        )
            .then((response) => {
                setavailableCategory(response.data)
            })
            .catch((err) => {
                setError("Failed to retrieve categories");
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
                setError("Failed to retrieve allergens");
            });
    }, []);

    if (success) {
        return <navigate to="/InventoryHome" />;
    }


    const headerLabel = "New MealBox";

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
                                <label htmlFor="inputName">MealBox Name</label>
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
                                <label htmlFor="inputName">Item Code</label>
                                <input
                                    id="inputCode"
                                    required
                                    type="text"
                                    className="form-control"
                                    pattern='[0-9]*'
                                    inputMode='numeric'
                                    value={itemCode}
                                    onChange={handleCodeChange}
                                    title="MealBox code must be numeric."
                                />
                                {itemCode.length > 0 && !/^[0-9 ]+$/.test(itemCode) &&
                                    <p className="text-danger">MealBox code can only contain numbers.</p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Item Cost</label>
                                <input
                                    id="inputCost"
                                    required
                                    className="form-control"
                                    pattern='[0-9]*'
                                    inputMode='numeric'
                                    value={itemCost}
                                    onChange={handleCostChange}
                                    title="MealBox cost must be numeric."
                                />
                                {itemCost.length > 0 && !/^[0-9 ]+$/.test(itemCost) &&
                                    <p className="text-danger">MealBox cost can only contain numbers.</p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Item Price</label>
                                <input
                                    id="inputPrice"
                                    required
                                    className="form-control"
                                    value={itemPrice}
                                    pattern='[0-9]*'
                                    inputMode='numeric'
                                    onChange={handlePriceChange}
                                    title="MealBox price must be numeric."
                                />
                                {itemPrice.length > 0 && !/^[0-9 ]+$/.test(itemPrice) &&
                                    <p className="text-danger">MealBox price can only contain numbers.</p>
                                }
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
                                    pattern='[0-9]*'
                                    inputMode='numeric'
                                    value={quantityAvailable}
                                    onChange={handleQuantityChange}
                                    title="MealBox quantity must be numeric."
                                />
                                {quantityAvailable.length > 0 && !/^[0-9 ]+$/.test(quantityAvailable) &&
                                    <p className="text-danger">MealBox quantity can only contain numbers.</p>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Upload Image</label>
                                <input
                                    id="image"
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
                                                                onChange={(event) => handleInputChange(event, ingredient)} />
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
                                                                onChange={(event) => handleallergenChange(event, allergen)} />
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
                                                                onChange={(event) => handleCategoryChange(event, category)} />
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
                    {error && (
                        <Box mt={2}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}

                </div>
            </section>
            <Copyright sx={{ pt: 4 }} />
        </div>
    );
}
export default function AdminMealBoxes() {
    return <AddMealBox />;
}
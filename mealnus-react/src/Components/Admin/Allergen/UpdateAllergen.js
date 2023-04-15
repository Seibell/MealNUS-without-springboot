import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { AdminAuthContext } from "../../../Context/AdminAuthContext";

import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

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

function handleClick(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        console.info(`Navigating to ${href}`);
        window.location.href = href;
    }
}


const classes = {
    root: "container",
    form: "form",
    input: "input",
};

function UpdateAllergen(props) {
    const { currentStaff } = useContext(AdminAuthContext);

    const navigate = useNavigate();
    const theme = createTheme();
    const [error, setError] = useState(false);

    const { allergenId } = useParams();
    const [allergenName, setname] = useState('');
    const [allergenDescription, setallergenDescription] = useState('');

    const [retrieved, setretrieved] = useState({});

    const handleNameChange = (event) => {
        setname(event.target.value);
    };

    const handleDescChange = (event) => {
        setallergenDescription(event.target.value);
    };


    useEffect(() => {
        Axios.get(
            "http://localhost:8080/MealNUS-war/rest/Allergen/getAllergenById/" + allergenId
        )
            .then((response) => {
                const retrieved = response.data;
                setretrieved(retrieved);
                setname(retrieved.allergenName);
                setallergenDescription(retrieved.allergenDescription);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const Allergen = { allergenName, allergenDescription }

        fetch('http://localhost:8080/MealNUS-war/rest/Allergen/updateAllergen/' + allergenId,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Allergen)
            })
            .then((response) => {
                window.opener.location.reload();
                navigate(window.close());
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(Allergen);
    }



    if (!currentStaff) {
        return <div>Access Denied: Please login to access MealNUS Admin Portal...</div>;
    }


    return (
        <div>
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">Update Allergen</h4>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="inputName">Allergen Name:</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={allergenName}
                                    onChange={handleNameChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputName"> Allergen Description:</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={allergenDescription}
                                    onChange={handleDescChange}
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <RouterLink to="/adminallergens" className="btn btn-default" onClick={(e) => window.close()}>
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

export default function AdminAllergens() {
    return <UpdateAllergen />;
}
import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./NavBar.js";

const classes = {
    root: "container",
    form: "form",
    input: "input",
};
function AddPromotion(props) {
    const { id = 0 } = useParams();
    const [promotionName, setPromotionName] = useState("");
    const [discount, setDiscount] = useState("");
    const [startDate, setStartDate] = useState(moment().toDate());
    const [endDate, setEndDate] = useState(moment().add(1, 'day').toDate());
    const navigate = useNavigate();
    const theme = createTheme();
    const [error, setError] = useState('');

    //Loading the data when editing the promotion
    useEffect(() => {
        if (id) {
            Axios.get(
                "http://localhost:8080/MealNUS-war/rest/promotion/{id}"
            )
                .then((res) => res.json())
                .then((promotion) => {
                    const { promotionName, discount, startDate, endDate } = promotion;
                    setPromotionName(promotionName);
                    setDiscount(discount);
                    setStartDate(moment(startDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
                    setEndDate(moment(endDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
                });
        }
    }, [id]);

    const validateData = () => {
        return promotionName.trim().length > 0;
    };

    const handleSubmit = (e) => {
        //prevent the normal form submit
        e.preventDefault();

        if (id === 0) {
            //create case
            if (validateData()) {
                const promotionData = {
                    // replace with the relevant data for your use case
                    promotionName,
                    discount,
                    startDate,
                    endDate,
                };
                fetch('http://localhost:8080/MealNUS-war/rest/promotion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(promotionData),
                })
                    .then((response) => {
                        navigate("/Promotions");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } /*else {
          //edit case
          if (validateData()) {
            Api.updateCustomer(id, {
              name,
              gender,
              dob,
            }).then((data) => {
              navigate("/searchCustomers");
            });
          }
        }*/
    };

    const headerLabel = id === 0 ? "New Promotion" : "Edit Promotion";

    return (
        <>
            <Navbar />
            <section className="content" key="content">
                <div className="card card-primary">
                    <div className="card-header text-center">
                        <h4 className="card-title">{headerLabel}</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="inputName">Promotion Name</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    required
                                    className="form-control"
                                    value={promotionName}
                                    onChange={(e) => setPromotionName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Discount</label>
                                <input
                                    id="inputDiscount"
                                    required
                                    className="form-control"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">Start Date(dd/mm/yyyy)</label>
                                <div className="input-group">
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={startDate}
                                        onChange={(startDate) => {
                                            console.log("#startDate: ", startDate);
                                            setStartDate(startDate);
                                        }}
                                        customInput={<input className="form-control" />}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName">End Date(dd/mm/yyyy)</label>
                                <div className="input-group">
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={endDate}
                                        onChange={(endDate) => {
                                            console.log("#endDate: ", endDate);
                                            setEndDate(endDate);
                                        }}
                                        customInput={<input className="form-control" />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <Link to="/Promotions">
                                <button className="btn btn-default" type="button">
                                    Cancel
                                </button>
                            </Link>
                            <button className="btn btn-primary float-right" type="submit" style={{ backgroundColor: "orange", border: "orange" }}>
                                Submit
                            </button>

                        </div>
                    </form>
                </div>
            </section>
        </>

    );
}

export default AddPromotion;
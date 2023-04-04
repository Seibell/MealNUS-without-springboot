import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AdminTitle from './AdminTitle';

function preventDefault(event) {
    event.preventDefault();
}

export default function AdminDashboardMtdCost() {
    const [data, setData] = useState(0);

    const currentDate = new Date().toLocaleDateString('en-SG', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        hour12: false
    }).replace(',', '');


    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdCost/${currentDate}`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <React.Fragment>
            <MonetizationOnTwoToneIcon />
            <AdminTitle>MTD Cost</AdminTitle>
            <div className="grid-item" style={{ overflow: 'hidden' }}>
                <Typography component="p" variant="h4">
                    <Typography variant="h6" style={{ fontSize: '18px', display: 'inline' }}>
                        $
                    </Typography>{' '}
                    {data.toFixed(0)}
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    As of {currentDate}
                </Typography>
                <br/>
            </div>
        </React.Fragment>
    );
}
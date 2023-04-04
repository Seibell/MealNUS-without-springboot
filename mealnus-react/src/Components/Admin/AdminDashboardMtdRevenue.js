import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import AdminTitle from './AdminTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function preventDefault(event) {
    event.preventDefault();
}

export default function AdminDashboardMtdRevenue() {
    const [data, setData] = useState(0);

    const targetRevenue = 100000;

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
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdRevenue/${currentDate}`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <React.Fragment>
            <div className="grid-container grid-item-mtd-revenue">
                <LocalAtmTwoToneIcon />
                <AdminTitle>MTD Revenue</AdminTitle>
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
                    <br />
                    <LinearProgress variant="determinate" value={data / targetRevenue * 100} sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="caption" color="text.secondary">
                            <b>{targetRevenue}</b>
                        </Typography>
                    </Box>
                </div>
            </div>

        </React.Fragment>
    );
}
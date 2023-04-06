import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import AdminTitle from './AdminTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function preventDefault(event) {
    event.preventDefault();
}

export default function AdminDashboardMtdProfit() {
    const [data, setData] = useState(0);

    const targetProfit = 40000;

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
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdProfit/${currentDate}`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <React.Fragment>
            <div className="grid-container grid-item-profit">
                <AttachMoneyTwoToneIcon />
                <AdminTitle>MTD Profit</AdminTitle>
                <div className="grid-item" style={{ overflow: 'hidden' }}>
                    <Typography component="p" variant="h4">
                        <Typography variant="h6" style={{ fontSize: '18px', display: 'inline' }}>
                            $
                        </Typography>{' '}
                        <b>{data.toFixed(0)}</b>
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        As of {currentDate}
                    </Typography>
                    <br />
                    <LinearProgress variant="determinate" value={data / targetProfit * 100} sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="caption" color="text.secondary">
                            <b>{targetProfit}</b>
                        </Typography>
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
}
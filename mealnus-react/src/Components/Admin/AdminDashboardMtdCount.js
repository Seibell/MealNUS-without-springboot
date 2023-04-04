import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import AnimationTwoToneIcon from '@mui/icons-material/AnimationTwoTone';
import AdminTitle from './AdminTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function preventDefault(event) {
    event.preventDefault();
}

export default function AdminDashboardMtdCount() {
    const [data, setData] = useState(0);

    const targetCount = 3000;

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
        fetch(`http://localhost:8080/MealNUS-war/rest/orders/mtdOrderCount/${currentDate}`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <React.Fragment>
            <div className="grid-container grid-item-mtd-count">
                <AnimationTwoToneIcon />
                <AdminTitle>MTD Orders</AdminTitle>
                <div className="grid-item" style={{ overflow: 'hidden' }}>
                    <Typography component="p" variant="h4">
                        {data}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        As of {currentDate}
                    </Typography>
                    <br />
                    <LinearProgress variant="determinate" value={data / targetCount * 100} sx={{ width: '100%' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="caption" color="text.secondary">
                            <b>{targetCount}</b>
                        </Typography>
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
}
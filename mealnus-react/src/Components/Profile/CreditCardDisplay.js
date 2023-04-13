import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

function CreditCardDisplay({ card, index, handleRemoveCardDialog, loading }) {
    return (
        <Card elevation={3}>
            <CardContent>
                <Cards
                    number={card.creditCardNumber}
                    name={card.cardOwnerName}
                    expiry={card.expiryDate.replace("/", "")}
                    cvc={card.cvv}
                    focused={null}
                    preview={true}
                />
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveCardDialog(card.creditCardId, index)}
                    disabled={loading}
                >
                    <Delete />
                </IconButton>
            </CardContent>
        </Card>
    );
}

export default CreditCardDisplay;
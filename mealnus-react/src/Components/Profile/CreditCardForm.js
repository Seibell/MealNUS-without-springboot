import React, { useState } from 'react';

const CreditCardForm = ({ onSubmit }) => {
    const [number, setNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ number, expirationDate, cvv });
        setNumber('');
        setExpirationDate('');
        setCvv('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Card Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Expiration Date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
            />
            <button type="submit">Add Credit Card</button>
        </form>
    );
};

export default CreditCardForm;
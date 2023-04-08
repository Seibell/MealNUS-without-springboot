import React, { useState, useEffect } from 'react';
import CreditCardItem from './CreditCardItem';
import CreditCardForm from './CreditCardForm';

const CreditCardList = () => {
    const [creditCards, setCreditCards] = useState([]);

    useEffect(() => {
        fetchCreditCards();
    }, []);

    const fetchCreditCards = async () => {
        // Replace with your REST API endpoint
        const response = await fetch('https://api.example.com/creditcards');
        const data = await response.json();
        setCreditCards(data);
    };

    const addCreditCard = async (newCard) => {
        // Replace with your REST API endpoint
        const response = await fetch('https://api.example.com/creditcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),
        });
        const data = await response.json();
        setCreditCards([...creditCards, data]);
    };

    const updateCreditCard = async (updatedCard) => {
        // Replace with your REST API endpoint
        await fetch(`https://api.example.com/creditcards/${updatedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCard),
        });
        fetchCreditCards();
    };

    return (
        <div>
            <h1>Credit Cards</h1>
            <CreditCardForm onSubmit={addCreditCard} />
            {creditCards.map((card) => (
                <CreditCardItem key={card.id} card={card} onUpdate={updateCreditCard} />
            ))}
        </div>
    );
};

export default CreditCardList;
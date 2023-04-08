import React, { useState } from 'react';

const CreditCardItem = ({ card, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [number, setNumber] = useState(card.number);
    const [expirationDate, setExpirationDate] = useState(card.expirationDate);
    const [cvv, setCvv] = useState(card.cvv);

    const handleUpdate = () => {
        onUpdate({ id: card.id, number, expirationDate, cvv });
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <p>Card Number: {number}</p>
                    <p>Expiration Date: {expirationDate}</p>
                    <p>CVV: {cvv}</p>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default CreditCardItem;
import { Input, TextField } from "@mui/material";
import CreditCardList from "./CreditCardList";

function CreditCards() {
    return (
        <div>
            <CreditCardList />
            <a href="/home">Back</a>
        </div>
    );
}

export default CreditCards;
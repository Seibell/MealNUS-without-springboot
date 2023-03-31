import { Input, TextField } from "@mui/material";

function ForgotPassword() {
    return (
      <div>
        <h1>Forgot Password</h1>
        <form>
            <TextField>
                <Input type="email" placeholder="Email" />
            </TextField>
        </form>
        <button>Send Email</button>
        <a href="/">Back</a>
      </div>
    );
  }
  
  export default ForgotPassword;
import React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: theme.spacing(2),
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 400,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

function ForgotPassword() {
  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Forgot Password
      </Typography>
      <StyledForm>
        <StyledTextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
        />
        <StyledButton variant="contained" color="primary" fullWidth>
          Send Email
        </StyledButton>
      </StyledForm>
      <Box mt={2}>
        <Link href="/" variant="body2">
          Back
        </Link>
      </Box>
    </StyledContainer>
  );
}

export default ForgotPassword;

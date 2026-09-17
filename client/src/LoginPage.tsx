import * as React from "react";
import { Login, LoginForm } from "react-admin";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginPage = (props: any) => {
  const navigate = useNavigate();

  return (
    <Login {...props}>
      <LoginForm />

      <Box sx={{ mt: 2, textAlign: "center", px: 2, pb: 2 }}>
        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={() => navigate("/register")}
        >
          Não tem uma conta? Crie uma aqui
        </Button>
      </Box>
    </Login>
  );
};

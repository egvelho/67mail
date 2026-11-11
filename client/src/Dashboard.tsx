import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListEmailsView } from "./ListEmailsView";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <Box>
      <Link to="/emails/send-email">Criar novo email</Link>
      <ListEmailsView />
    </Box>
  );
};

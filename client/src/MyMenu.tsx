import * as React from "react";
import { Menu } from "react-admin";
import EmailIcon from "@mui/icons-material/Email"; // Ícone opcional do Material UI

export const MyMenu = () => (
  <Menu>
    {/* Itens padrão ou outros recursos do seu admin podem vir aqui */}
    <Menu.Item
      to="/emails/send-email"
      primaryText="Enviar E-mail"
      leftIcon={<EmailIcon />}
    />
  </Menu>
);

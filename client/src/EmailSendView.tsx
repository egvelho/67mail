import * as React from "react";
import { Title, useNotify } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const EmailSendView = () => {
  const notify = useNotify();
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    to: "",
    toName: "",
    subject: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/emails/send-email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          to: formData.to,
          toName: formData.toName,
          subject: formData.subject,
          content: formData.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar requisição.");
      }

      notify("E-mail enviado com sucesso!", { type: "success" });
      setFormData({ to: "", toName: "", subject: "", content: "" });
    } catch (error) {
      notify(`Erro: ${error.message}`, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 700, mx: "auto" }}>
      <Title title="Enviar E-mail" />

      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 3, fontWeight: 600 }}
          >
            Enviar E-mail
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="to"
              name="to"
              type="email"
              value={formData.to}
              onChange={handleChange}
              required
              fullWidth
              placeholder="email@destino.com"
              variant="outlined"
            />

            <TextField
              label="toName"
              name="toName"
              value={formData.toName}
              onChange={handleChange}
              required
              fullWidth
              placeholder="Nome do destinatário"
              variant="outlined"
            />

            <TextField
              label="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              fullWidth
              placeholder="Assunto"
              variant="outlined"
            />

            <TextField
              label="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={6}
              placeholder="Conteúdo da mensagem..."
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<SendIcon />}
              sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}
            >
              {loading ? "Enviando..." : "Enviar E-mail"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

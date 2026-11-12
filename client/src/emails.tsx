import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
} from "react-admin";

export const EmailList = () => (
  <List actions={false}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="subject" label="Assunto" />
      <EmailField source="sender" label="Remetente" />
      <DateField source="createdAt" label="Data de Criação" showTime />
    </Datagrid>
  </List>
);

export const EmailShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="subject" label="Assunto" />
      <EmailField source="sender" label="Remetente" />
      <MarkdownField source="content" label="Mensagem" />
      <DateField source="createdAt" label="Data de Criação" showTime />
    </SimpleShowLayout>
  </Show>
);

import * as React from "react";
import { useRecordContext } from "react-admin";
import ReactMarkdown from "react-markdown";

interface MarkdownFieldProps {
  source: string;
  label?: string;
}

const MarkdownField = ({ source }: MarkdownFieldProps) => {
  const record = useRecordContext();
  if (!record) return null;

  const content = record[source] || "";

  return (
    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

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
      <TextField source="content" label="Conteúdo / Mensagem" />
      <DateField source="createdAt" label="Data de Criação" showTime />
    </SimpleShowLayout>
  </Show>
);

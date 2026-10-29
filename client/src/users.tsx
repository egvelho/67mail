import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nome" />
      <TextField source="surname" label="Sobrenome" />
      <TextField source="username" label="Nome de usuário" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Nome" required />
      <TextInput source="surname" label="Sobrenome" required />
      <TextInput source="username" label="E-mail" type="username" required />
      <TextInput
        source="password"
        label="Nova Senha (deixe em branco para não alterar)"
        type="password"
      />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create mutationMode="pessimistic">
    <SimpleForm>
      <TextInput source="name" label="Nome" required />
      <TextInput source="surname" label="Sobrenome" required />
      <TextInput source="username" label="E-mail" type="username" required />
      <TextInput source="password" label="Senha" type="password" required />
    </SimpleForm>
  </Create>
);

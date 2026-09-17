import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

import { UserList, UserCreate, UserEdit } from "./users";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>

    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
    />
  </Admin>
);

export default App;

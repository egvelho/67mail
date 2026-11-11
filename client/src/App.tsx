import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { EmailSendView } from "./EmailSendView";
import { MyMenu } from "./MyMenu";
import { ListEmailsView } from "./ListEmailsView";
import { Dashboard } from "./Dashboard";

import { UserList, UserCreate, UserEdit } from "./users";

const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;

export const App = () => (
  <Admin
    layout={MyLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    dashboard={Dashboard}
  >
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>

    <CustomRoutes>
      <Route path="/emails/send-email" element={<EmailSendView />} />
      <Route path="/emails/list-email" element={<ListEmailsView />} />
    </CustomRoutes>
  </Admin>
);

export default App;

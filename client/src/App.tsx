import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { EmailSendView } from "./EmailSendView";
import { MyMenu } from "./MyMenu";
import { EmailList, EmailShow } from "./emails";

const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;

export const App = () => (
  <Admin
    layout={MyLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    dashboard={EmailSendView}
  >
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>

    <Resource name="emails" list={EmailList} show={EmailShow} />
  </Admin>
);

export default App;

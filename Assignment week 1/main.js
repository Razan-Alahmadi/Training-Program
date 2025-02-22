import { Form } from "./components/Form.js";
import { CompanyList } from "./components/companyList.js";

const app = document.getElementById("app");


const formComponent = new Form();
formComponent.render(app);


const companyListListComponent = new CompanyList();
companyListListComponent.render(app);

import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/js/bootstrap";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import TenantList from "./components/TenantList";
import CreateTenant from "./components/CreateTenant";
import UpdateTenant from "./components/UpdateTenant";




function App() {
  return (
   <div className="App">
       <h1>React/PHP CRUD Tenancy</h1>
       {/*BrowserRouter Contains all the routes for the Application*/}
       <BrowserRouter>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <div className="container-fluid">
                   <a className="navbar-brand" href="#">React/PHP</a>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                           aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                   </button>
                   <div className="collapse navbar-collapse" id="navbarSupportedContent">
                       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                           <li className="nav-item">
                               <Link to="/">Tenants</Link> {/*The Route for Viewing All Tenants*/}
                           </li>
                           <li className="nav-item">
                               <Link to="tenant/create">Add a Tenant</Link> {/*The Route for adding a Tenant*/}
                           </li>
                       </ul>

                   </div>
               </div>
           </nav>
           {/*The Routes component contains each Route for the Application and states which path (component)
           the Route must point to*/}
       <Routes>
           <Route index element={<TenantList/>}></Route> {/*The Home (Index Page) for Viewing and Making Tenant Changes*/}
           <Route path="tenant/create" element={<CreateTenant/>}></Route> {/*The Route for Adding a Tenant*/}
           <Route path="tenant/:tenantid/update" element={<UpdateTenant/>}></Route> {/*The Route for Updating a Tenant*/}

       </Routes>

       </BrowserRouter>
   </div>);
}

export default App;

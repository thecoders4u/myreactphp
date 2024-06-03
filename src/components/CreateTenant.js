import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import {SERVER_URL} from "../Config";



export default function CreateTenant(){

   const handleSubmit = (event) => {
       event.preventDefault();
       console.log(inputs);
       axios.post(SERVER_URL+'tenant/save', inputs).then(
           function(response){
               console.log(response.data);
               navigate('/');
           }
       );

   }

   const handleChange = (event) => {
       const name = event.target.name;
       const value = event.target.value;
       setInputs(values => ({
           ...values, [name]:value}));

   }
    const navigate = useNavigate();
   const [inputs, setInputs] = useState({});


    return (<>
        <h3>CreateTenants</h3>

        <form onSubmit={handleSubmit} style={{width : "50%", marginLeft: "auto", marginRight: "auto"}}>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                <input type="text" name="name" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} />

            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">DOB</label>
                <input type="date" name="dob" className="form-control" onChange={handleChange} />

            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                <input type="text"  name="phone" className="form-control" onChange={handleChange}/>

            </div>

            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    </>);
}
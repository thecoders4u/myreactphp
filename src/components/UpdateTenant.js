import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {SERVER_URL} from "../Config";


export default function UpdateTenant(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([{
    }]);

    const params = useParams();
    const id = params.tenantid;



    useEffect(() => {
        getTenant();
    }, []);

    function getTenant() {
        axios.get(SERVER_URL+`tenant/${id}/get`).then(function(response) {
            console.log('hi');
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(SERVER_URL+`backend/tenant/${id}/update`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });

    }
    return (
        <div>
            <h1>Update tenant</h1>
            <form onSubmit={handleSubmit} style={{width : "50%", marginLeft: "auto", marginRight: "auto"}}>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input value={inputs.name} type="text" name="name" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={inputs.email} type="email" name="email" className="form-control" onChange={handleChange} />

                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">DOB</label>
                    <input value={inputs.dob} type="date" name="dob" className="form-control" onChange={handleChange} />

                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                    <input value={inputs.phone} type="text"  name="phone" className="form-control" onChange={handleChange}/>

                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}
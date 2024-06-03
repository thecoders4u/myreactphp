import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import  classes from '../App.css';
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import '../Config';
import {SERVER_URL} from "../Config";


export default function TenantList(){

    const [tenants, setTenants] = useState([]);
    useEffect(() => {
        getTenants();  {/*Upon making any changes the effect must return all Tenants*/}
    }, []);


    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    function getTenants() {
        axios.get(SERVER_URL+'tenant/get').then(function(response) {
            console.log(response.data);
            setTenants(response.data);
        });
    }

    const deleteTenant = (id) => {
        axios.delete(SERVER_URL+`tenant/${id}/delete`).then(function(response){
            console.log(response.data);
            closeModal();
            getTenants();
        });
    }





    return (
        <div>
            <h1>List of tenants</h1>
            <table className="table" style={{width : "65%", marginLeft: "auto", marginRight: "auto"}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>DOB</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tenants.map((tenant, key) =>
                    <tr key={key}>
                        <td>{tenant.id}</td>
                        <td>{tenant.name}</td>
                        <td>{tenant.email}</td>
                        <td>{tenant.phone}</td>
                        <td>{tenant.dob}</td>
                        <td>
                            <button className="btn btn-info"><Link to={`tenant/${tenant.id}/update`} style={{marginRight: "10px", color: "white", textDecoration: "none"}}>Edit</Link></button>
                            <button onClick={openModal} className="btn btn-danger">Delete</button>
                            <Modal show={showModal} onClose={closeModal}>
                                <h2>Confirmation</h2>
                                <p>Do you really want to delete your Tenant?</p>
                                <div className="button-container">
                                    <button onClick={() => deleteTenant(tenant.id)} className="btn btn-danger">Yes</button>

                                    <button onClick={closeModal} className="btn btn-success">No</button>
                                </div>


                            </Modal>
                            {/*<button onClick={() => deleteTenant(tenant.id)} className="btn btn-danger">Delete</button>*/}
                        </td>
                    </tr>
                )}

                </tbody>
            </table>
        </div>
    )
}
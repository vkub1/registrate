import React from 'react'
import { useSearchParams } from "react-router-dom";
import {useNavigate} from 'react-router'
import Table from 'react-bootstrap/Table'

export default function ConfirmationPage() {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    console.log()

    return(
        <div id="confirmation-page" className="page">
            <div className="d-flex flex-column align-items-center" >
                <h1 className="mx-3" id="thanking-text-container">Thank you for registering!</h1>
                <button className="button-back align-self-center" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            
            <div id="registration-details" 
            className="px-3 d-flex flex-column justify-content-around container align-self-center align-items-center">
                <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Provided Information</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>First Name</td>
                    <td>{searchParams.get('firstName')}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{searchParams.get('lastName')}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{searchParams.get('email')}</td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>{searchParams.get('phoneNumber')}</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{searchParams.get('age')}</td>
                </tr>
                </tbody>

                </Table>
                <div>
                    <img src={`https://countryflagsapi.com/png/${searchParams.get('country').toLowerCase()}`}></img>
                </div>
            </div>
            
        </div>
    )
}

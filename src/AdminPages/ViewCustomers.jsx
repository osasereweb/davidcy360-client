import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import loader from '../images/loader3.gif';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import check_logo from '../images/check-verified.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useLocation } from 'react-router-dom';
import Select from 'react-select'




function ViewCustomers() {

    const location = useLocation();


    const [errorMessage, seterrorMessage] = useState('');
    const [isError, setisError] = useState(false);

    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);




    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 py-2 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
                    DavidCy360
                </a>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

            </header>

            <div style={{ width: '65%', margin: 'auto', marginTop: 50 }}>
                <h4 style={{}}>Customer Details</h4>
                <div style={{ fontSize: 12, color: 'grey', marginTop: 15 }}>Customer ID: {location.state.customer.customerID}</div>
                <div style={{ marginTop: 15 }}>
                    <span>First Name:</span>
                    <span> {location.state.customer.firstName}</span>
                </div>
                <div style={{ marginTop: 15 }}>
                    <span>Last Name:</span>
                    <span> {location.state.customer.lastName}</span>
                </div>

                <div style={{ marginTop: 15 }}>
                    <span>Customer Email:</span>
                    <span> {location.state.customer.email}</span>
                </div>

                <div style={{ marginTop: 20 }}>
                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>Customer Address:</div>
                    <div>
                        {
                            (location.state.customer.address.length == 0) ?
                                <div style={{ marginTop: 8 }}>Customer has no delivery address!</div>
                                :
                                location.state.customer.address.map((item, index) => {
                                    return <div key={index} style={{ marginTop: 8, borderBottom: '1px solid grey', padding: 8 }}>
                                        {item.address1} {item.zipCode} {item.country.value} {item.country.label} {item.userNumber}
                                    </div>
                                })
                        }
                    </div>
                </div>

                <div style={{ marginTop: 30 }}>
                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>Customer Orders:</div>
                    <div>
                        {
                            (location.state.customer.orders.length == 0) ?
                                <div style={{ marginTop: 8 }}>Customer has no order!</div>
                                :
                                location.state.customer.orders.map((item, index) => {
                                    return <div key={index} style={{ marginTop: 8, borderBottom: '1px solid grey', padding: 8, fontSize: 14 }}>
                                        <div>
                                            <span>Package ID: </span>
                                            <span> {item.packageID}</span>
                                        </div>

                                        <div style={{ marginTop: 6 }}>
                                            <span>Date of order: </span>
                                            <span> {item.dateOfOrder}</span>
                                        </div>

                                        <div style={{ marginTop: 6 }}>
                                            <span>Total Amount: </span>
                                            <span> ₦{item.totalAmount}</span>
                                        </div>

                                        <div style={{ marginTop: 6 }}>
                                            <span>Order status: </span>
                                            <span> {item.status}</span>
                                        </div>

                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default ViewCustomers
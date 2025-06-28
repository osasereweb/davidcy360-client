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



function PackageDetails() {

    let base_url = `https://davidcy360-server.onrender.com`;

    const location = useLocation();


    const [selectedStatus, setselectedStatus] = useState({});
    const [options, setoptions] = useState([
        {
            value: 'Pending',
            label: 'Pending'
        },
        {
            value: 'Processing',
            label: 'Processing'
        },
        {
            value: 'Shipped',
            label: 'Shipped'
        },
        {
            value: 'Delivered',
            label: 'Delivered'
        },
        {
            value: 'Cancelled',
            label: 'Cancelled'
        },
        {
            value: 'Refunded',
            label: 'Refunded'
        },
    ])


    const [errorMessage, seterrorMessage] = useState('');
    const [isError, setisError] = useState(false);

    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);


    const changeStatusOfOrder = async (userEmail, packageID) => {

        if (selectedStatus === null || Object.keys(selectedStatus).length === 0) {
            seterrorMessage('Please set the new order status to proceed!')
            return setisError(true);
        }

        const userdata = {
            userEmail,
            packageID,
            newStatus: selectedStatus.label
        }
        //make a request
        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/change-order-status`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userdata)
        })

        const data = await res.json();


        if (data.statusChanged) {
            setShowA(true);
        }

    }



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


            <div style={{ width: '70%', margin: 'auto', marginTop: 40, marginBottom: 80 }}>
                <div style={{ marginBottom: 50, width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 14, flexWrap: 'wrap' }}>


                    <div style={{ marginTop: 30, width: '40%' }}>
                        <div style={{ fontWeight: 'bold', fontSize: 18 }}>Customer Details</div>

                        <div style={{ marginTop: 12 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>Full Name:</span>
                            <span> {location.state.userData[0].firstName} {location.state.userData[0].lastName}</span>
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>Email Address: </span>
                            <span>{location.state.userData[0].email}</span>
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}> Delivery Address:  </span>
                            <span>{location.state.deliveryAddress}</span>
                        </div>

                        <div style={{ marginTop: 15, fontWeight: 'bold', color: 'grey' }}>Other Delivery Address:</div>
                        <div style={{ marginTop: 3 }}>
                            {
                                location.state.userData[0].address.map((item, index) => {
                                    return <div key={index} style={{ marginTop: 6 }}>
                                        •  {item.address1} {item.zipCode} {item.country.value}  {item.country.label}  {item.userNumber}
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div style={{ marginRight: 15, marginTop: 30, width: '40%' }}>
                        <div style={{ fontWeight: 'bold', fontSize: 18 }}>Order Details</div>

                        <div style={{ marginTop: 12 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>  Package ID:  </span>
                            <span>{location.state.packageID}</span>
                        </div>

                        <div style={{ marginTop: 15 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>Order status:</span>
                            <span style={{ border: '1px solid grey', paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5, borderRadius: 10, fontSize: 14, marginLeft: 10 }}>{location.state.status}</span>
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>  Date of order:  </span>
                            <span>{location.state.dateOfOrder}</span>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>  Delivery Period:  </span>
                            <span>{location.state.deliveryPeriod}</span>
                        </div>

                        <div style={{ marginTop: 10, fontWeight: 'bold' }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>  Total Amount (fees included): </span>
                            <span> ₦{location.state.totalAmount}</span>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <span style={{ fontSize: 12, color: 'grey' }}>  Date of Delivery: </span>
                            <span>{location.state.dateOfDelivery}</span>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            {
                                (isError) ? <div style={{ color: 'red', fontSize: 12 }}>*{errorMessage}</div> : null
                            }
                        </div>


                        <div style={{ marginTop: 15, marginBottom: 5 }}>Update status of order:</div>

                        <Select style={{ padding: 3 }} options={options} value={selectedStatus} onChange={(value) => { setselectedStatus(value) }} />

                        <Button variant="primary" size='sm' className='mt-3 mb-2' onClick={() => {
                            changeStatusOfOrder(location.state.userData[0].email, location.state.packageID)
                        }} >Save changes</Button>
                    </div>



                </div>
                {
                    <Table>
                        <thead>
                            <tr>
                                <th>Product(s) </th>
                                {/* <th>Product name</th> */}
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Subtotal</th>

                                {/* <th> &nbsp; &nbsp; &nbsp; </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                location.state.packages.map((item, index) => {

                                    return <tr key={index} style={{ flex: 1, width: '100%', }}>
                                        <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <div style={{ marginRight: 10 }}>
                                                <img
                                                    src={item.url[0].link}
                                                    width={100}
                                                    height={100}
                                                    className="d-inline-block"
                                                    alt="cart"
                                                />
                                            </div>
                                            <div style={{
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical'
                                            }}>{item.name}</div>
                                        </td>

                                        <td style={{ position: 'relative' }}>
                                            <div style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                            >
                                                ₦{item.price}
                                            </div>
                                        </td>

                                        <td style={{ position: 'relative' }}>

                                            <div style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}>{item.quantity}</div>

                                        </td>

                                        <td style={{ position: 'relative' }}>

                                            <div style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}>{item.size}</div>

                                        </td>

                                        <td style={{ position: 'relative' }}>

                                            <div style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}>{item.color}</div>

                                        </td>



                                        <td style={{ position: 'relative' }}>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: '50%',
                                                    top: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                ₦{Number(item.price) * Number(item.quantity)}
                                            </div>
                                        </td>
                                    </tr>

                                })
                            }

                        </tbody>
                    </Table>
                }
                <ToastContainer
                    className="p-0"
                    position={'top-center'}
                    style={{ zIndex: 100000000000, opacity: 1, backgroundColor: 'white', marginTop: 30 }}
                >

                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>
                            <img
                                src={check_logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                style={{ borderRadius: 50 }}
                                alt="check logo"
                            />
                            <strong className="me-auto mx-3">Done!</strong>
                        </Toast.Header>
                        <Toast.Body>Package status have been changed successfully!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>


        </>
    )
}

export default PackageDetails
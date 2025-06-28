import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import loader from '../images/loader3.gif';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import check_logo from '../images/check-verified.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../App';
import { confirmAlert } from 'react-confirm-alert'; // Import



function ViewOrder() {

    let base_url = `https://davidcy360-server.onrender.com`;


    const [
        userCart,
        setuserCart,
        addToUserCart,
        removeFromUserCart,
        isCart,
        userWishList,
        isWishList,
        setuserWishList,
        addToUserWishList,
        removeFromUserWishList,
        userGeneralEmailState,
        setuserGeneralEmailState,
        currencyRate,
        setcurrencyRate,
        currencyArray,
        setcurrencyArray,
        updateCurrencyArray,
        updateCurrentCurrency
    ] = useContext(CartContext);

    const location = useLocation();
    window.scrollTo(0, 0);

    const [toastMessage, settoastMessage] = useState('');

    const [gifLoading, setgifLoading] = useState(false);
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const [errorMessage, seterrorMessage] = useState('');
    const [error, seterror] = useState(false);


    const [userEmail, setuserEmail] = useState('');


    const checkAuthorization = async () => {

        const res = await fetch(`${base_url}/user/profile/details`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();

        if (data.authenticated) {
            //load user profile 
            setuserEmail(data.data.email);

        } else {
            return navigate("/login")
        }

    }

    useEffect(() => {
        checkAuthorization();
    }, [])



    const cancelOrder = async (packageID) => {


        confirmAlert({
            title: 'Confirm to cancel',
            message: 'Are you sure you want to cancel this order?\n\nAfter cancellation of the order, message us on whatsapp for follow up.\n\nReturn and refund usually takes 30 days in review.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {

                        setgifLoading(true);

                        if (location.state.status === 'Cancelled') {
                            setgifLoading(false);
                            seterrorMessage('*Order already cancelled! Please wait for a refund.')
                            return seterror(true)
                        }

                        if (location.state.status !== 'Pending') {
                            setgifLoading(false);
                            seterrorMessage('*Sorry can only cancel order in pending status only! Call DavidCy360 Africa customer service for more enquiries.')
                            return seterror(true)
                        } else {

                            let bodyData = {
                                packageID: packageID,
                                email: userEmail
                            }

                            const res = await fetch(`${base_url}http://localhost:3000/edith/cancel-cart-orders`, {
                                withCredntials: true,
                                credentials: 'include',
                                method: 'POST',
                                headers: {
                                    "Content-Type": 'application/json',
                                },
                                body: JSON.stringify(bodyData)
                            })

                            const data = await res.json();

                            if (data.orderCancelled) {
                                setgifLoading(false);
                                setShowA(true)
                            } else {
                                setgifLoading(false);
                                seterrorMessage('*Cannot make changes at this time!')
                                return seterror(true)
                            }

                        }


                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return
                    }
                }
            ]
        });

    }



    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <Header />


            <div style={{ width: '70%', margin: 'auto', marginTop: 50, marginBottom: 80 }}>
                <div style={{ marginBottom: 50, marginTop: 20, width: '60%' }}>
                    <h4 style={{ marginBottom: 15, marginTop: 0 }}>Order Details</h4>
                    <div style={{ color: 'grey', fontSize: 13 }}>Package ID: {location.state.packageID}</div>
                    <div style={{ marginTop: 10 }} >
                        <span style={{ color: 'grey', fontSize: 14 }}>Order status:</span>
                        <span style={{ border: '1px solid grey', paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5, borderRadius: 10, fontSize: 12, marginLeft: 10 }}>{location.state.status}</span>
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <span style={{ color: 'grey', fontSize: 14 }}>Date of order: </span>
                        <span> {location.state.dateOfOrder}</span>
                    </div>
                    <div style={{ marginTop: 6 }}>
                        <span style={{ color: 'grey', fontSize: 14 }}>Delivery Period: </span>
                        <span> {location.state.deliveryPeriod}</span>
                    </div>

                    <div style={{ marginTop: 6, }}>
                        <span style={{ color: 'grey', fontSize: 14 }}>Total Amount (fees included): </span>
                        <span> ${location.state.totalAmount}</span>
                    </div>

                    <div style={{ marginTop: 6, }}>
                        <span style={{ color: 'grey', fontSize: 14 }}>Date of Delivery: </span>
                        <span> {location.state.dateOfDelivery}</span>
                    </div>

                    <div style={{ marginTop: 8 }}>
                        <span style={{ color: 'grey', fontSize: 14 }}>Delivery Address: </span>
                        <span> {location.state.deliveryAddress}</span>
                    </div>

                    <div style={{ marginTop: 8 }}>
                        {
                            (error) ?
                                <div style={{ fontSize: 12, color: 'red' }}>{errorMessage}</div>
                                :
                                null
                        }
                    </div>

                    <Button variant="danger" size='sm' className='mt-4 mb-2'>
                        {
                            (gifLoading) ?
                                <img
                                    src={loader}
                                    width="30"
                                    height="30"
                                    className="d-inline-block"
                                    style={{ borderRadius: 50 }}
                                    alt="loader"
                                />
                                :
                                <span
                                    onClick={() => {
                                        cancelOrder(location.state.packageID)
                                    }}
                                >
                                    Cancel Order
                                </span>
                        }


                    </Button>



                </div>
                {
                    <Table responsive={true} >
                        <thead>
                            <tr>
                                <th>Product(s) </th>
                                {/* <th>Product name</th> */}
                                <th>Price per product</th>
                                <th>Product quantity</th>
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
                                                {currencyRate.sign}{(item.price / Number(currencyRate.rate)).toFixed(2)}
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
                                                {currencyRate.sign}{(Number(item.price) * Number(item.quantity) / Number(currencyRate.rate)).toFixed(2)}
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
                            <strong className="me-auto mx-3">Confirmed!</strong>
                        </Toast.Header>
                        <Toast.Body>Order have been cancelled successfully!</Toast.Body>
                    </Toast>
                </ToastContainer>

            </div>

            <Footer />

        </div>
    )
}

export default ViewOrder
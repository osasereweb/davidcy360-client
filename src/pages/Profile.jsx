import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import tip_return from '../images/tip-return.jpg'
import loader from '../images/loader3.gif';
import Button from 'react-bootstrap/Button';
import Footer from '../components/footer';
import Header from '../components/Header';
import visa_image from '../images/visa.png';
import master_image from '../images/logo.png';
import { CartContext } from '../App';



function Profile() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    const navigate = useNavigate();

    const [userData, setuserData] = useState({});
    const [isLoading, setisLoading] = useState(true);

    let windowHeight = window.innerHeight;

    const [navheight, setNavheight] = useState(76);

    const [addressToShow, setaddressToShow] = useState([]);




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
            setuserData(data.data);

            if (data.data.address.length == 1) {
                setaddressToShow([data.data.address[0]]);
            }
            if ((data.data.address.length > 1)) {
                setaddressToShow([data.data.address[0], data.data.address[1]]);
            }

        } else {
            return navigate("/login")
        }

    }


    useEffect(() => {
        checkAuthorization();
    }, [])

    useLayoutEffect(() => {
        setisLoading(false);
    }, [userData])



    const logoutUser = async () => {

        const res = await fetch(`${base_url}/user/profile/logout`, {
            method: 'POST',
            withCredntials: true,
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            }
        })

        if (res.ok) window.location.reload();

    }




    return (
        <>
            <Header />

            <div>
                {
                    (isLoading) ?
                        <div style={{ height: windowHeight - navheight, backgroundColor: 'black', opacity: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <img
                                    src={loader}
                                    width="75"
                                    height="75"
                                    className="d-inline-block"
                                    alt="cart"
                                />
                            </div>
                        </div>
                        :
                        <>
                            <div className="px-4 pt-3 my-5 mt-5 text-center">
                                <h5 className="display-4 fw-bold text-body-emphasis fs-3">Welcome, <span>{userData.firstName}</span></h5>
                            </div>

                            <div className="container px-4 py-3 mt-4" id="featured-3">
                                <h5 className="pb-2 border-bottom">My Orders</h5>
                                <div className="row g-4 py-2 row-cols-1 row-cols-lg-3">
                                    <div className="feature col w-100">
                                        <div>
                                            <div>
                                                {
                                                    (Object.keys(userData).length > 0 && userData.orders.length > 0) ?
                                                        <div className="table-responsive">
                                                            <table className="table table-striped table-sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Order ID</th>
                                                                        <th scope="col">Date of Order</th>
                                                                        <th scope="col">Total Amount</th>
                                                                        <th scope="col">Delivery Period</th>
                                                                        <th scope="col">Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        userData.orders.slice(0).reverse().map((item, index) => {
                                                                            return <tr key={index} style={{ cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    navigate('/profile/order', {
                                                                                        state: {
                                                                                            id: item._id,
                                                                                            dateOfOrder: item.dateOfOrder,
                                                                                            deliveryPeriod: item.deliveryPeriod,
                                                                                            packageID: item.packageID,
                                                                                            status: item.status,
                                                                                            totalAmount: item.totalAmount,
                                                                                            packages: item.packages,
                                                                                            deliveryAddress: item.deliveryAddress,
                                                                                            url: item.url
                                                                                        }
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <td>{item.packageID}</td>
                                                                                <td>{item.dateOfOrder}</td>
                                                                                <td>{currencyRate.sign}{(item.totalAmount / Number(currencyRate.rate)).toFixed(2)}</td>
                                                                                <td>{item.deliveryPeriod}</td>
                                                                                <td>{item.status}</td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        :
                                                        <div>Your first order will display here</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container px-4 py-5 mt-3" id="featured-3">
                                <h5 className="pb-2 border-bottom">My Information</h5>
                                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                                    <div className="feature col">
                                        <h5 className="text-body-emphasis">Profile</h5>
                                        <div className="mt-4 mb-2">
                                            <div id="userProfileNames">{userData.firstName} {userData.lastName}</div>
                                            <div id="userProfileEmail">{userData.email}</div>
                                        </div>
                                        <a href='/profile/edit-profile' className="link" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                            Edit Details
                                        </a> &nbsp;
                                        <a href="/profile/change-password" className="link" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                            Change Password
                                        </a>
                                    </div>
                                    <div className="feature col">
                                        <h5 className=" text-body-emphasis">Address Book</h5>
                                        <div className="mt-3" >
                                            {
                                                ((Object.keys(userData).length > 0) && (addressToShow.length > 0)) ?
                                                    <div>
                                                        {
                                                            addressToShow.map((item, i) => {
                                                                return <div key={i} className='py-2' style={{ fontSize: 13, borderBottom: '1px solid #80808050' }}>
                                                                    {item.address1} {item.zipCode} {item.country.value} {item.country.label} {item.userNumber}
                                                                </div>
                                                            })
                                                        }
                                                        <div>
                                                            <a href='/profile/all-address' className="link" style={{ textDecoration: 'none', cursor: 'pointer', fontSize: 13 }}>
                                                                View all address
                                                            </a>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>No delivery address added yet!</div>
                                            }
                                        </div>
                                        <div className='mt-2'>
                                            <a href='/profile/add-address' className="link" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                                + Add Address
                                            </a>
                                        </div>
                                    </div>
                                    <div className="feature col">
                                        <h5 className="text-body-emphasis">Payment Method</h5>
                                        <div className="mt-3">
                                            <div>
                                                <img
                                                    src={visa_image}
                                                    width={50}
                                                    height={50}
                                                    className="d-inline-block"
                                                    alt="cart"
                                                />

                                                <img
                                                    src={master_image}
                                                    width={35}
                                                    height={35}
                                                    className="d-inline-block mx-3"
                                                    alt="cart"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="container px-4 py-5 mt-2" id="featured-3">
                                <h5 className="pb-2 border-bottom">Tips</h5>
                                <div className="card text-center mt-3" style={{ width: '40%', minWidth: '20rem' }}>
                                    <img
                                        src={tip_return}
                                        width="100%"
                                        height="180"
                                        className="d-inline-block"
                                        alt="cart"
                                    />
                                    <h5 className="text-body-emphasis mt-4">Return</h5>
                                    <div className="card-body">
                                        <p className="card-text">If your Suitsupply purchase does not meet your expectations or if you change
                                            your mind.</p>
                                    </div>
                                    <a href="/returns-refunds" className="link mb-3" style={{ textDecoration: 'none' }}>
                                        Read More
                                    </a>
                                </div>
                            </div>

                            <div className="px-4 pt-5 my-5 mt-5 text-center">
                                <Button variant="outline-dark" size='lg' onClick={logoutUser}>Logout</Button>
                            </div>
                        </>
                }
            </div>

            <Footer />
        </>
    )
}

export default Profile
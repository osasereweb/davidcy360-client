import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import loader from '../images/loader3.gif';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import deleteIcon from '../images/trash.png';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import check_logo from '../images/check-verified.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';




function ViewAllAddress() {

    let base_url = import.meta.env.SERVER_URL;

    const navigate = useNavigate();

    const [userData, setuserData] = useState({});
    const [isLoading, setisLoading] = useState(true);

    let windowHeight = window.innerHeight;

    const [navheight, setNavheight] = useState(76);


    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);


    const [gifLoading, setgifLoading] = useState(false);


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





    const deleteAddress = async (id) => {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this address?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {

                        let addressID = {
                            id,
                            email: userData.email,
                        }


                        //all good make request
                        setgifLoading(true);
                        const res = await fetch(`${base_url}/edith/delete-address`, {
                            withCredntials: true,
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify(addressID)
                        })

                        const data = await res.json();

                        if (data.addressDeleted) {

                            setuserData(data.data)
                            setShowA(true);
                            setgifLoading(false);
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

                            <div className="container px-4 py-5 mt-5 mb-5" id="featured-3">
                                <h5 className="pb-2 border-bottom">My Address</h5>
                                <div className="row g-4 py-2 row-cols-1 row-cols-lg-3">
                                    <div className="feature col w-100">
                                        <div>
                                            <div>
                                                {
                                                    (Object.keys(userData).length > 0 && userData.address.length > 0) ?
                                                        <div className="table-responsive">
                                                            <table className="table table-striped table-sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Address</th>
                                                                        <th scope="col">Zip Code</th>
                                                                        <th scope="col">Country Value</th>
                                                                        <th scope="col">Country Label</th>
                                                                        <th scope="col">Mobile Number</th>
                                                                        <th scope="col">&nbsp; &nbsp; &nbsp;</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        userData.address.slice(0).reverse().map((item, index) => {
                                                                            return <tr key={index} style={{}}

                                                                            >
                                                                                <td>{item.address1} </td>
                                                                                <td>{item.zipCode}</td>
                                                                                <td>{item.country.value}</td>
                                                                                <td>{item.country.label}</td>
                                                                                <td>{item.userNumber}</td>
                                                                                <td style={{ position: 'relative' }}>
                                                                                    <div
                                                                                        style={{
                                                                                            position: 'absolute',
                                                                                            left: '50%',
                                                                                            top: '50%',
                                                                                            transform: 'translate(-50%, -50%)'
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            (gifLoading) ?
                                                                                                <img
                                                                                                    src={loader}
                                                                                                    width={20}
                                                                                                    height={20}
                                                                                                    className="d-inline-block"
                                                                                                    alt="delete"
                                                                                                />
                                                                                                :
                                                                                                <img
                                                                                                    src={deleteIcon}
                                                                                                    width={20}
                                                                                                    height={20}
                                                                                                    className="d-inline-block"
                                                                                                    alt="delete"
                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                    onClick={() => deleteAddress(item._id)}
                                                                                                />
                                                                                        }
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        :
                                                        <div>Your delivery address will appear here when added!</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2'>

                                    <Button variant="primary" size='sm' className='mt-3 mb-2' onClick={() => {
                                        navigate('/profile/add-address')
                                    }} >+ Add Address</Button>
                                </div>

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
                                        <Toast.Body>Address have been deleted successfully!</Toast.Body>
                                    </Toast>
                                </ToastContainer>

                            </div>
                        </>
                }
            </div>

            <Footer />

        </>
    )
}

export default ViewAllAddress
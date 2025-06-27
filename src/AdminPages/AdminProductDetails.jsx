import React, { useContext, useEffect, useRef, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import loader from '../images/loader3.gif';
import check_logo from '../images/check-verified.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import




function AdminProductDetails() {

    let base_url = import.meta.env.SERVER_URL;

    const location = useLocation();


    const [markAsDeleted, setmarkAsDeleted] = useState(false);
    const [liveMessage, setliveMessage] = useState('Live');

    const [isLoading, setisLoading] = useState(false)


    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);




    const deleteProduct = async (id, imageId) => {


        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const userdata = {
                            id,
                            imageId
                        }
                        //make a request
                        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/products/delete-product`, {
                            withCredntials: true,
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify(userdata)
                        })

                        const data = await res.json();

                        if (data.isDeleted) {
                            setShowA(true);
                            setliveMessage('Deleted');
                        } else {
                            window.alert('Could not make changes at this time!')
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



    const logoutAdmin = async () => {

        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/logout`, {
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

                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" onClick={logoutAdmin}>
                            Sign out
                        </a>
                    </div>
                </div>
            </header>


            <div style={{ width: '80%', margin: 'auto' }}>
                <div style={{ marginTop: 20 }}>

                    <div style={{ marginTop: 10, fontSize: 14, color: 'red', border: '1px solid red', borderRadius: 50, width: 65, display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {liveMessage} </div>


                    <div style={{ marginTop: 10, fontSize: 14, color: 'grey' }}>Product ID: {location.state.product.id} </div>

                    <div style={{ marginTop: 10, fontSize: 14, color: 'grey' }}>Date added: {location.state.product.dateAdded} </div>

                    <div style={{ fontWeight: 'bold', marginTop: 10 }}>Product Name</div>
                    <div>{location.state.product.name}</div>

                    <div style={{ marginTop: 10, fontSize: 14, color: 'grey' }}>Product category: {location.state.product.category} </div>

                    <div style={{ marginTop: 10, fontSize: 20, }}> <span style={{ fontSize: 14 }}>Product price:</span> ₦{location.state.product.price}</div>


                    <div style={{ marginTop: 10, fontSize: 14, }} className='text-primary'>Product Quantity: {location.state.product.quantity} </div>

                    <div style={{ marginTop: 10, fontSize: 14, }} className='text-info'>Product weight: {location.state.product.weight}kg </div>

                    <div style={{ marginTop: 10, fontSize: 14, }} className='text-warning'>
                        <span>Available sizes:</span>
                        {
                            location.state.product.sizes.map((item, i) => {
                                return <span key={i} style={{ marginRight: 10 }}> {item}</span>
                            })
                        }
                    </div>

                    <div style={{ marginTop: 10, fontSize: 14, }} className='text-success'>
                        <span>Available colors:</span>
                        {
                            location.state.product.colors.map((item, i) => {
                                return <span key={i} style={{ marginRight: 10 }}> {item}</span>
                            })
                        }
                    </div>
                </div>

                <div style={{ marginTop: 20 }}>
                    <div style={{ fontWeight: 'bold' }}>Description</div>
                    <div>{location.state.product.description}</div>
                </div>

                <div style={{ marginTop: 20 }}>
                    <div style={{ fontWeight: 'bold' }}>Product Images</div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        {
                            location.state.product.url.map((item, index) => {
                                return <div key={index} >
                                    <img
                                        src={item.link}
                                        width={200}
                                        height={200}
                                        className="d-inline-block mx-3 mt-3"
                                        alt="cart"
                                    />
                                </div>
                            })
                        }
                    </div>
                </div>

                <div className='mt-3 mb-5'>
                    <Button variant="danger" size='sm' className='mt-3 mb-2' >

                        {
                            (isLoading) ?
                                <div>
                                    <img
                                        src={loader}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"
                                        style={{ borderRadius: 50 }}
                                        alt="check logo"
                                    />
                                </div>
                                :
                                <span
                                    onClick={() => {
                                        deleteProduct(location.state.product.id, location.state.product.url)
                                    }} >Delete product</span>
                        }
                    </Button>
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
                            <strong className="me-auto mx-3">Done!</strong>
                        </Toast.Header>
                        <Toast.Body>Product have been deleted successfully!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>


        </>
    )
}

export default AdminProductDetails
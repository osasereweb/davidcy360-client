import React, { useContext, useEffect, useRef, useState } from 'react'

import bg1 from '../images/bg-1.jpg';
import deleteIcon from '../images/trash.png';
import { CartContext } from '../App';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import loader from '../images/loader3.gif';
import { useNavigate } from 'react-router-dom';




function Sales() {


    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';


    const navigate = useNavigate();

    const [allOrders, setallOrders] = useState({});
    const [isLoading, setisLoading] = useState(true);

    let windowHeight = window.innerHeight;
    const [amount, setamount] = useState(0);

    const [orderStatus, setorderStatus] = useState('All (Including Refunded)')



    const getAllOrders = async () => {

        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/getAllOrders`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();


        if (data.isFound) {
            setallOrders(data.data.orders);

            //sum up all pices
            let sum = 0;
            data.data.orders.map((item, index) => {
                sum = sum + Number(item.totalAmount)
            })

            setamount(sum);
            setisLoading(false);
        } else {
            navigate(`/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/login`)
        }
    }



    //get all orders
    useEffect(() => {

        getAllOrders();

    }, [])

    useEffect(() => {
        if (allOrders.length > 0) setisLoading(false);
    }, [allOrders])


    const filterAmount = (value) => {
        let sum = 0;
        switch (value) {
            case 'AllI':

                //sum up all picesss
                allOrders.map((item, index) => {
                    sum = sum + Number(item.totalAmount)
                })

                setamount(sum);
                setorderStatus(`All (Including Refunded)`)

                break;

            case 'AllE':

                //sum up all pices
                allOrders.map((item, index) => {
                    if (item.status == 'Refunded') {
                        sum = sum - Number(item.totalAmount)
                    } else {
                        sum = sum + Number(item.totalAmount)
                    }
                })

                setamount(sum);
                setorderStatus(`All (Excluding Refunded)`)

                break;

            case 'Pending':

                //sum up all pices
                allOrders.map((item, index) => {
                    if (item.status == 'Pending') {
                        sum = sum + Number(item.totalAmount)
                    }
                })

                setamount(sum);
                setorderStatus(`Pending`)

                break;

            case 'Processing':

                //sum up all pices
                allOrders.map((item, index) => {
                    if (item.status == 'Processing') {
                        sum = sum + Number(item.totalAmount)
                    }
                })

                setamount(sum);
                setorderStatus(`Processing`)

                break;

            case 'Shipped':

                //sum up all pices
                allOrders.map((item, index) => {
                    if (item.status == 'Shipped') {
                        sum = sum + Number(item.totalAmount)
                    }
                })

                setamount(sum);
                setorderStatus(`Shipped`)
                break;

            case 'Delivered':

                //sum up all pices
                allOrders.map((item, index) => {
                    if (item.status == 'Delivered') {
                        sum = sum + Number(item.totalAmount)
                    }
                })

                setamount(sum);
                setorderStatus(`Delivered`)
                break;

            case 'Refunded':

                //sum up all pices
                allOrders.map((item, index) => {
                    if (item.status == 'Refunded') {
                        sum = sum + Number(item.totalAmount)
                    }
                })

                setamount(sum);
                setorderStatus(`Refunded`)
                break;

            case 'Cancelled':

                //sum up all pices
                allOrders.map((item, index) => {
                    if (item.status == 'Cancelled') {
                        sum = sum + Number(item.totalAmount)
                    }
                })

                setamount(sum);
                setorderStatus(`Cancelled`)
                break;


            default:
                break;
        }
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

            {
                (isLoading) ?
                    <div style={{ height: windowHeight, backgroundColor: 'black', opacity: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                    <div>
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


                        <div className="container-fluid">
                            <div className="row">
                                <nav
                                    id="sidebarMenu"
                                    className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
                                >
                                    <div className="position-sticky pt-3">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-orders">
                                                    <span data-feather="file" />
                                                    Orders
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/add-product">
                                                    <span data-feather="shopping-cart" />
                                                    Add Product
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products">
                                                    <span data-feather="shopping-cart" />
                                                    All Products
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-customers">
                                                    <span data-feather="users" />
                                                    Customers
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/settings">
                                                    <span data-feather="users" />
                                                    Settings
                                                </a>
                                            </li>
                                        </ul>
                                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                            <span>Saved reports</span>
                                            <a className="link-secondary" href="#" aria-label="Add a new report">
                                                <span data-feather="plus-circle" />
                                            </a>
                                        </h6>
                                        <ul className="nav flex-column mb-2">
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black', fontWeight: 'bold' }} href="#">
                                                    <span data-feather="file-text" />
                                                    Sales
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/currency-rates">
                                                    <span data-feather="file-text" />
                                                    Currency Rates
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                        <h1 className="h2">Admin Dashboard</h1>
                                        <div className="btn-toolbar mb-2 mb-md-0">
                                            <div className='me-2'>
                                                Filter Sales by Order status
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Status
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/All" onClick={() => {
                                                        filterAmount('AllI')
                                                    }}>All (Including refunded)</Dropdown.Item>
                                                    <Dropdown.Item href="#/All" onClick={() => {
                                                        filterAmount('AllE')
                                                    }}>All (Excluding refunded)</Dropdown.Item>
                                                    <Dropdown.Item href="#/Pending" onClick={() => {
                                                        filterAmount('Pending')
                                                    }}>Pending</Dropdown.Item>
                                                    <Dropdown.Item href="#/Processing" onClick={() => {
                                                        filterAmount('Processing')
                                                    }}>Processing</Dropdown.Item>
                                                    <Dropdown.Item href="#/Shipped" onClick={() => {
                                                        filterAmount('Shipped')
                                                    }}>Shipped</Dropdown.Item>
                                                    <Dropdown.Item href="#/Delivered" onClick={() => {
                                                        filterAmount('Delivered')
                                                    }}>Delivered</Dropdown.Item>
                                                    <Dropdown.Item href="#/Cancelled" onClick={() => {
                                                        filterAmount('Cancelled')
                                                    }}>Cancelled</Dropdown.Item>
                                                    <Dropdown.Item href="#/Refunded" onClick={() => {
                                                        filterAmount('Refunded')
                                                    }}>Refunded</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <h5>Sales Report</h5>

                                    <div style={{ marginTop: 30, }}>
                                        <span style={{ color: 'grey', fontSize: 16 }}>Order Status: </span>
                                        <span style={{ marginLeft: 10, fontSize: 26, }}>{orderStatus}</span>
                                    </div>

                                    <div style={{ marginTop: 30, }}>
                                        <span style={{ color: 'grey', fontSize: 16 }}>Total Amount: </span>
                                        <span style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>₦{amount}</span>
                                    </div>
                                </main>
                            </div>
                        </div>

                    </div>
            }

        </>
    )
}

export default Sales
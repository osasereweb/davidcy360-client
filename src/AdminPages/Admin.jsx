import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import loader from '../images/loader3.gif';
import { useNavigate } from 'react-router-dom';



function Admin() {

    let base_url = import.meta.env.SERVER_URL;

    const navigate = useNavigate();

    const [allOrders, setallOrders] = useState({});
    const [isLoading, setisLoading] = useState(true);

    let windowHeight = window.innerHeight;
    const [navheight, setNavheight] = useState(76);

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
            setstableOrdersArray(data.data.orders);
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


    const [searchTerm, setsearchTerm] = useState('');
    const [stableOrdersArray, setstableOrdersArray] = useState([])

    const filterOrders = (searchValue) => {
        let filterArray = []

        filterArray = allOrders;

        let newFilteredArray = [];

        if (searchValue == '') return setallOrders(stableOrdersArray);

        filterArray.map((item, index) => {
            if (item.packageID.toUpperCase().includes(searchValue.toUpperCase())) {
                newFilteredArray.push(item);
            }
        })

        setallOrders(newFilteredArray);
    }



    const filterByStatus = (value) => {
        if (value === 'All') {
            setallOrders(stableOrdersArray);
        } else {
            let emptyArray = [];
            stableOrdersArray.map((item, index) => {
                if (item.status === value) {
                    emptyArray.push(item);
                }
            })
            setallOrders(emptyArray);
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
                            <input class="form-control form-control-dark w-100" type="text" placeholder="Filter by order ID" aria-label="Search"
                                onKeyUp={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        setallOrders(stableOrdersArray);
                                    }
                                }}
                                onChange={(e) => {
                                    setsearchTerm(e.target.value);
                                    filterOrders(e.target.value)
                                }}
                                value={searchTerm}
                            ></input>
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
                                            {/* <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">
                                        <span data-feather="home" />
                                        Dashboard
                                    </a>
                                </li> */}
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black', fontWeight: 'bold' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-orders">
                                                    <span data-feather="file" />
                                                    Orders
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/add-product">
                                                    <span data-feather="shopping-cart" />
                                                    Add Products
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
                                            {/* <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="bar-chart-2" />
                                        Reports
                                    </a>
                                </li> */}
                                            {/* <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="layers" />
                                        Integrations
                                    </a>
                                </li> */}
                                        </ul>
                                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                            <span>Saved reports</span>
                                            <a className="link-secondary" href="#" aria-label="Add a new report">
                                                <span data-feather="plus-circle" />
                                            </a>
                                        </h6>
                                        <ul className="nav flex-column mb-2">
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/sales">
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
                                            {/* <div className="btn-group me-2">
                                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                                    Share
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                                    Export
                                                </button>
                                            </div> */}
                                            <div className='me-2'>
                                                Filter by Order status
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Status
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/All" onClick={() => {
                                                        filterByStatus('All')
                                                    }}>All</Dropdown.Item>
                                                    <Dropdown.Item href="#/Pending" onClick={() => {
                                                        filterByStatus('Pending')
                                                    }}>Pending</Dropdown.Item>
                                                    <Dropdown.Item href="#/Processing" onClick={() => {
                                                        filterByStatus('Processing')
                                                    }}>Processing</Dropdown.Item>
                                                    <Dropdown.Item href="#/Shipped" onClick={() => {
                                                        filterByStatus('Shipped')
                                                    }}>Shipped</Dropdown.Item>
                                                    <Dropdown.Item href="#/Delivered" onClick={() => {
                                                        filterByStatus('Delivered')
                                                    }}>Delivered</Dropdown.Item>
                                                    <Dropdown.Item href="#/Cancelled" onClick={() => {
                                                        filterByStatus('Cancelled')
                                                    }}>Cancelled</Dropdown.Item>
                                                    <Dropdown.Item href="#/Refunded" onClick={() => {
                                                        filterByStatus('Refunded')
                                                    }}>Refunded</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <h2>Orders</h2>

                                    {
                                        (allOrders.length == 0) ?
                                            <div>No orders yet/corresponding status!</div>
                                            :
                                            <div className="table-responsive">
                                                <table className="table table-striped table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Order ID</th>
                                                            <th scope="col">Date of order</th>
                                                            <th scope="col">Delivery Period</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allOrders.slice().reverse().map((item, index) => {
                                                                return <tr key={index}
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        navigate('/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/package-details', { state: { packageID: item.packageID, dateOfOrder: item.dateOfOrder, deliveryPeriod: item.deliveryPeriod, totalAmount: item.totalAmount, status: item.status, dateOfDelivery: item.dateOfDelivery, packages: item.packages, userData: item.userData, deliveryAddress: item.deliveryAddress } })
                                                                    }}
                                                                >
                                                                    <td>{item.packageID}</td>
                                                                    <td>{item.dateOfOrder}</td>
                                                                    <td>{item.deliveryPeriod}</td>
                                                                    <td>₦{item.totalAmount}</td>
                                                                    <td>{item.status}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                    }

                                </main>
                            </div>
                        </div>

                    </div>
            }

        </>
    )
}

export default Admin
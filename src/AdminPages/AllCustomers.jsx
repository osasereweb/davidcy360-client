import React, { useContext, useEffect, useRef, useState } from 'react'
import loader from '../images/loader3.gif';
import { useNavigate } from 'react-router-dom';



function AllCustomers() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    const navigate = useNavigate();

    const [allCustomers, setallCustomers] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    let windowHeight = window.innerHeight;



    const getAllCustomers = async () => {

        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-customers`, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();


        if (data.found) {
            setallCustomers(data.data);
            setstableCustomersArray(data.data);
        } else {
            navigate(`/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/login`)
        }

        // else {
        //     window.alert('Could not load data at this point!')
        //     setisLoading(false);
        // }
    }

    //get all orders
    useEffect(() => {
        getAllCustomers();
    }, [])

    useEffect(() => {
        if (allCustomers.length > 0) setisLoading(false);
    }, [, allCustomers])


    const [searchTerm, setsearchTerm] = useState('');
    const [stableCustomersArray, setstableCustomersArray] = useState([])

    const filterCustomers = (searchValue) => {
        let filterArray = []

        filterArray = allCustomers;

        let newFilteredArray = [];

        if (searchValue == '') return setallCustomers(stableCustomersArray);

        filterArray.map((item, index) => {
            if (item.customerID.toUpperCase().includes(searchValue.toUpperCase())) {
                newFilteredArray.push(item);
            }
        })

        setallCustomers(newFilteredArray);
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

                            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"
                                onKeyUp={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        setallCustomers(stableCustomersArray);
                                    }
                                }}
                                onChange={(e) => {
                                    setsearchTerm(e.target.value);
                                    filterCustomers(e.target.value)
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
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-orders">
                                                    <span data-feather="file" />
                                                    Orders
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/add-product">
                                                    <span data-feather="shopping-cart" />
                                                    All Products
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black', }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products">
                                                    <span data-feather="shopping-cart" />
                                                    All Products
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black', fontWeight: 'bold' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-customers">
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

                                    </div>
                                    <h4>All Customers</h4>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Customer First Name</th>
                                                    <th scope="col">Customer Last Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Customer ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allCustomers.slice().reverse().map((item, index) => {
                                                        return <tr key={index}
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => {
                                                                navigate(`/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-customers/customer`, { state: { customer: item } })
                                                            }}
                                                        >
                                                            <td style={{ position: 'relative' }}>
                                                                <div>
                                                                    {item.firstName}
                                                                </div>
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                <div>
                                                                    {item.lastName}
                                                                </div>
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                <div>
                                                                    {item.email}
                                                                </div>
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                <div>
                                                                    {item.customerID}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </main>
                            </div>
                        </div>

                    </div>
            }

        </>
    )
}

export default AllCustomers
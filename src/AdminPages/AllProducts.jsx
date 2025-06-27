import React, { useContext, useEffect, useRef, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import loader from '../images/loader3.gif';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import check_logo from '../images/check-verified.png';
import Accordion from 'react-bootstrap/Accordion';
import { confirmAlert } from 'react-confirm-alert'; // Import



function AllProducts() {

    let base_url = import.meta.env.SERVER_URL;

    const navigate = useNavigate();

    const [allProducts, setallProducts] = useState([])
    const [isLoading, setisLoading] = useState(true);

    let windowHeight = window.innerHeight;


    const [isGifLoading, setisGifLoading] = useState(false)



    const getAllProducts = async () => {

        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products`, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();

        if (data.isFound) {
            setallProducts(data.data);
            setstableProductsArray(data.data);
        } else {
            navigate(`/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/login`)
        }
    }

    //get all orders
    useEffect(() => {

        getAllProducts()

    }, [])

    useEffect(() => {
        if (allProducts.length > 0) setisLoading(false);
    }, [, allProducts])




    const [searchTerm, setsearchTerm] = useState('');
    const [stableProductsArray, setstableProductsArray] = useState([])

    const filterProducts = (searchValue) => {
        let filterArray = []

        filterArray = allProducts;

        let newFilteredArray = [];

        if (searchValue == '') return setallProducts(stableProductsArray);

        filterArray.map((item, index) => {
            if (item.id.toUpperCase().includes(searchValue.toUpperCase())) {
                newFilteredArray.push(item);
            }
        })

        setallProducts(newFilteredArray);
    }



    const deleteAllProducts = async () => {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete all products? This action can not be undone.',
            buttons: [
                {
                    label: 'Delete',
                    onClick: async () => {

                        const userdata = {
                            allProducts
                        }
                        //make a request
                        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/products/delete-all-product`, {
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
                                        setallProducts(stableProductsArray);
                                    }
                                }}
                                onChange={(e) => {
                                    setsearchTerm(e.target.value);
                                    filterProducts(e.target.value)
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
                                                    Add Products
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ color: 'black', fontWeight: 'bold' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products">
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
                                            <div style={{ fontSize: 18 }}>
                                                <span>Total Products: </span>
                                                <span style={{ fontWeight: 'bold' }}>{allProducts.length}</span>
                                            </div>

                                            <div>
                                                <Button variant="danger" size='sm' className='mt-0 mx-3 mb-0'>

                                                    {
                                                        (isGifLoading) ?
                                                            <img
                                                                src={loader}
                                                                width="30"
                                                                height="30"
                                                                className="d-inline-block"
                                                                style={{ borderRadius: 50 }}
                                                                alt="loader"
                                                            />
                                                            :
                                                            <span onClick={deleteAllProducts}> Delete All Products </span>
                                                    }
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                    <h4>All Products</h4>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Product ID</th>
                                                    <th scope="col">Date Added</th>
                                                    <th scope="col">Quantiy Available</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allProducts.slice().reverse().map((item, index) => {
                                                        return <tr key={index}
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => {
                                                                navigate(`/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products/${item.id}`, { state: { product: item } })
                                                            }}
                                                        >
                                                            <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                <div style={{ marginRight: 10 }}>
                                                                    <img
                                                                        src={item.url[0].link}
                                                                        width={80}
                                                                        height={80}
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
                                                                    transform: 'translate(-50%, -50%)',
                                                                    marginRight: 15
                                                                }}
                                                                >
                                                                    {item.id}
                                                                </div>
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    marginRight: 15
                                                                }}
                                                                >
                                                                    {item.dateAdded}
                                                                </div>
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    marginRight: 15
                                                                }}
                                                                >
                                                                    {item.quantity}
                                                                </div>
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    marginRight: 15
                                                                }}
                                                                >
                                                                    {item.category}
                                                                </div>
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    marginRight: 15
                                                                }}
                                                                >
                                                                    ₦{item.price}
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

export default AllProducts
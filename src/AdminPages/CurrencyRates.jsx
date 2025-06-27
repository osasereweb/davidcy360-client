import React, { useContext, useEffect, useRef, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import loader from '../images/loader3.gif';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import check_logo from '../images/check-verified.png';




function CurrencyRates() {

    let base_url = import.meta.env.SERVER_URL;

    const navigate = useNavigate();

    const [usdCurrencyRate, setusdCurrencyRate] = useState(0);
    const [euroCurrencyRate, seteuroCurrencyRate] = useState(0);
    const [chinaCurrencyRate, setchinaCurrencyRate] = useState(0);
    const [poundCurrencyRate, setpoundCurrencyRate] = useState(0)

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const [isGifLoading, setisGifLoading] = useState(false);
    const [error, seterror] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');


    const saveCurrencyRates = async () => {
        if (usdCurrencyRate == '' || euroCurrencyRate == '' || chinaCurrencyRate == '' || poundCurrencyRate == '') {
            seterrorMessage('*Please input currency rates!');
            return seterror(true);
        }

        let rateArray = [
            {
                region: 'NIG',
                rate: '1',
                symbol: 'NGN',
                sign: '₦',
            },
            {
                region: 'USA',
                rate: usdCurrencyRate.toString(),
                symbol: 'USD',
                sign: '$',
            },
            {
                region: 'GBP',
                rate: poundCurrencyRate.toString(),
                symbol: 'GBP',
                sign: '£',
            },
            {
                region: 'EUR',
                rate: euroCurrencyRate.toString(),
                symbol: 'EUR',
                sign: '€',
            },
            {
                region: 'CHN',
                rate: chinaCurrencyRate.toString(),
                symbol: 'YEN',
                sign: '¥',
            },

        ]


        let bodyData = {
            rates: rateArray
        }


        setisGifLoading(true);
        seterror(false);
        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/save-settings/save-currency-rates`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(bodyData)
        })

        const data = await res.json();

        // console.log(data)

        if (data.isSaved) {

            setShowA(true);
            setisGifLoading(false);
        } else if (!data.isSaved) {
            seterrorMessage('*Changes could not be made at this time!');
            return seterror(true);
        } else {
            navigate(`/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/login`)
        }


    }


    const [currencyRatesArray, setcurrencyRatesArray] = useState([])

    const loadPrevSettings = async () => {

        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-settings`, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();


        if (data.found) {

            if (data.data.length !== 0) {
                setcurrencyRatesArray(data.data[0].currencyRates);

                setusdCurrencyRate(data.data[0].currencyRates[1].rate);
                setpoundCurrencyRate(data.data[0].currencyRates[2].rate)
                seteuroCurrencyRate(data.data[0].currencyRates[3].rate)
                setchinaCurrencyRate(data.data[0].currencyRates[4].rate)
            }
        } else {
            navigate(`/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/login`)
        }

        // else {
        //     seterrorMessage('*Could not load data at this time.')
        //     setisErrorImages(true);
        //     return setisError(true)
        // }

    }

    useEffect(() => {
        loadPrevSettings();
    }, [])



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
                                        <a className="nav-link" style={{ color: 'black', fontWeight: 'bold' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/currency-rates">
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
                            <h4>Currency Rates</h4>
                            <div>


                                <div style={{ marginTop: 18 }}>
                                    <div>USD ($) currency rate: </div>
                                    <input
                                        name="usdRate"
                                        placeholder='Enter current USD exchange rate'
                                        type='Number'
                                        value={usdCurrencyRate}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 130, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setusdCurrencyRate(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Pounds (£) currency rate: </div>
                                    <input
                                        name="euroRate"
                                        placeholder='Enter current EURO exchange rate'
                                        type='Number'
                                        value={poundCurrencyRate}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 180, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setpoundCurrencyRate(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Euro (€) currency rate: </div>
                                    <input
                                        name="euroRate"
                                        placeholder='Enter current EURO exchange rate'
                                        type='Number'
                                        value={euroCurrencyRate}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 180, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            seteuroCurrencyRate(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Yen (¥) currency rate: </div>
                                    <input
                                        name="yenRate"
                                        placeholder='Enter current YEN exchange rate'
                                        type='Number'
                                        value={chinaCurrencyRate}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 205, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setchinaCurrencyRate(e.target.value)
                                        }}
                                    />
                                </div>



                                <div style={{ marginTop: 15, marginBottom: 20 }}>
                                    <Button variant="primary" size='sm' className='mt-3 mb-2' >
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
                                                <span onClick={() => {
                                                    //launch product
                                                    saveCurrencyRates()
                                                }} >Save Rates</span>
                                        }
                                    </Button>
                                </div>


                            </div>
                        </main>

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
                                <Toast.Body>Currency Rates upated successfully!</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </div>
                </div>

            </div>


        </>
    )
}

export default CurrencyRates
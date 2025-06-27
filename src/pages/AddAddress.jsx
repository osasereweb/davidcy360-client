import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';
import loader from '../images/loader3.gif';
import Button from 'react-bootstrap/Button';
import hide_password from '../images/hide.png'
import view_password from '../images/view.png'
import check_logo from '../images/check-verified.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Select from 'react-select'
import countryList from 'react-select-country-list'

function AddAddress() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    let windowHeight = window.innerHeight;

    const [navheight, setNavheight] = useState(76);

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const [continentOptions, setcontinentOptions] = useState([
        {
            value: 'North America',
            label: 'North America'
        },
        {
            value: 'South America',
            label: 'South America'
        },
        {
            value: 'Europe',
            label: 'Europe'
        },
        {
            value: 'Asia',
            label: 'Asia'
        },
        {
            value: 'Africa',
            label: 'Africa'
        },
        {
            value: 'Antarctica',
            label: 'Antarctica'
        },
        {
            value: 'Oceania',
            label: 'Oceania'
        },
    ])


    const [userData, setuserData] = useState({});
    const [isLoading, setisLoading] = useState(true);

    const [passwordToggle, setpasswordToggle] = useState('password');

    const [userEmail, setuserEmail] = useState('');
    const [addressOne, setaddressOne] = useState('');

    const [userNumber, setuserNumber] = useState('');

    const [zipCode, setzipCode] = useState('');
    const [selectedCountry, setselectedCountry] = useState('');
    const [selectedRegion, setselectedRegion] = useState('')

    const [passwordInput, setpasswordInput] = useState('');
    const [errorMessage, seterrorMessage] = useState(``);
    const [isError, setisError] = useState(false);

    const [gifLoading, setgifLoading] = useState(false);
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const toggleViewPassword = () => {
        if (passwordToggle == 'text') setpasswordToggle('password');
        else setpasswordToggle('text');
    }


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


    const addUserAddress = async () => {

        if (addressOne == `` || userNumber == '' || zipCode == '' || selectedCountry == '' || selectedRegion == '') {
            seterrorMessage('All fields are required! if address 1 is same as address 2, re-input the address.');
            return setisError(true);
        }

        if (passwordInput == '') {
            seterrorMessage('Please input password to add address!');
            return setisError(true);
        }

        const userdata = {
            email: userEmail,
            password: passwordInput,
            addressOne,
            userNumber,
            zipCode,
            selectedCountry,
            selectedRegion
        }


        //all good make request
        setgifLoading(true);
        const res = await fetch(`${base_url}/edith/add-address`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userdata)
        })

        const data = await res.json();



        if (data.addressAdded) {
            setgifLoading(false);
            setShowA(true);

            setpasswordInput('');
            setaddressOne('');
            // setaddressTwo('');
            setzipCode('');

            seterrorMessage('');
            setisError(false);

            // setTimeout(() => {
            //     // setShowA(false);
            // }, 5000);

        } else if (data.isWrongPassword) {
            setgifLoading(false);
            seterrorMessage('Incorrect password, please retry!');
            setisError(true);
        } else {
            setgifLoading(false);
            seterrorMessage('Failed to make changes, please retry!');
            setisError(true);
        }


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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: 450, marginTop: 30, marginBottom: 60 }}>

                                <div className='mt-4' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                    <h5>Add Delivery Address</h5>

                                </div>

                                <div style={{ width: '100%', backgroundColor: '#bbdefb', borderWidth: 0.5, borderColor: 'gray', borderRadius: 0, padding: 14, marginTop: 10 }}>
                                    <div>
                                        <span>Address</span>
                                        <span style={{ fontSize: 11, marginLeft: 10 }}>(Address must end with local government and state name respectively.)</span>
                                        <input
                                            name="address"
                                            placeholder='Enter Address'
                                            type='text'
                                            value={addressOne}
                                            style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                            onChange={e => {
                                                setaddressOne(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: 18 }}>
                                        <span>Contact</span>
                                        <span style={{ fontSize: 11, marginLeft: 10 }}>(Add multiple numbers seperated by comma)</span>
                                        <input
                                            name="userNumber"
                                            placeholder='Mobile Number'
                                            type='text'
                                            value={userNumber}
                                            style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                            onChange={e => {
                                                setuserNumber(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: 18 }}>
                                        <span>Zip Code</span>
                                        <input
                                            name="zipCode"
                                            placeholder='Enter zip code'
                                            type='text'
                                            value={zipCode}
                                            style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                            onChange={e => {
                                                setzipCode(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: 18 }}>
                                        <span>Country</span>
                                        <Select styles={{ marginTop: 8, padding: 3 }} options={options} value={selectedCountry} onChange={(value) => { setselectedCountry(value) }} />
                                    </div>


                                    <div style={{ marginTop: 18 }}>
                                        <span>Region</span>
                                        <Select styles={{ marginTop: 8, padding: 3 }} options={continentOptions} value={selectedRegion} onChange={(value) => { setselectedRegion(value) }} />
                                    </div>


                                    <div style={{ marginTop: 18 }}>
                                        <div>Password</div>
                                        <div style={{ backgroundColor: 'white', borderWidth: 0.5, borderColor: 'gray', borderRadius: 6, marginTop: 5, padding: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <input
                                                name="firstName"
                                                placeholder='Enter password'
                                                type={passwordToggle}
                                                value={passwordInput}
                                                style={{ border: 0, outline: 0, flex: 1 }}
                                                onChange={e => {
                                                    setpasswordInput(e.target.value)
                                                }}
                                            />

                                            <div style={{ cursor: 'pointer', marginRight: 5 }} onClick={toggleViewPassword}>
                                                {
                                                    (passwordToggle == 'password') ?
                                                        <img
                                                            src={view_password}
                                                            width="18"
                                                            height="18"
                                                            className="d-inline-block align-top"
                                                            alt="davidcy360 logo"
                                                        />
                                                        :
                                                        <img
                                                            src={hide_password}
                                                            width="18"
                                                            height="18"
                                                            className="d-inline-block align-top"
                                                            alt="davidcy360 logo"
                                                        />
                                                }
                                            </div>

                                        </div>

                                    </div>

                                    <div style={{ marginTop: 10 }}>
                                        <p style={{ color: 'red', fontSize: 13 }}>{errorMessage}</p>
                                    </div>

                                    <div style={{ marginTop: 25, marginBottom: 15 }}>
                                        <Button size="sm" variant="dark" className='w-100'  >
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
                                                    <span onClick={addUserAddress}>Add Address</span>
                                            }
                                        </Button>
                                    </div>
                                </div>

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
                                    <Toast.Body>Address have been added successfully!</Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                }
            </div>

            <Footer />

        </>
    )
}

export default AddAddress
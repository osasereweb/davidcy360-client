import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import logo from '../images/symbolcy360.jpg';
import { useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import check_logo from '../images/check-verified.png';
import loader from '../images/loader3.gif';

function Signup() {

    let base_url = import.meta.env.SERVER_URL;

    const navigate = useNavigate();

    let windowHeight = window.innerHeight;
    const [firstName, setfirstName] = useState(``);
    const [lastName, setlastName] = useState(``);
    const [email, setemail] = useState(``);
    const [password, setpassword] = useState(``);
    const [confirmPassword, setconfirmPassword] = useState(``);
    const [errorMessage, seterrorMessage] = useState(``);
    const [isError, setisError] = useState(false);
    const [isFormSubmitted, setisFormSubmitted] = useState(false);


    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }


    const signupUser = async () => {
        ///validate front end userinput (sign up)
        if (firstName == `` || lastName == `` || email == `` || password == `` || confirmPassword == ``) {
            seterrorMessage('All fields are required!');
            return setisError(true);
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailPattern.test(email);
        if (!isValid) {
            seterrorMessage('This email address does not exist!');
            return setisError(true);
        }
        if (password.length < 8) {
            seterrorMessage('Your password is to short!');
            return setisError(true);
        }
        if (password !== confirmPassword) {
            seterrorMessage('Password does not match!');
            return setisError(true);
        }
        //sign up form is okay, send daata to backend
        const userdata = {
            firstName: capitalizeFirstLetter(firstName),
            lastName: capitalizeFirstLetter(lastName),
            email,
            password
        }

        const res = await fetch(`${base_url}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userdata)
        })

        const data = await res.json();

        if (data.exist) {
            seterrorMessage('This email is associated with an existing account!');
            return setisError(true);
        }

        if (res.ok) setisFormSubmitted(true);
    }



    const [isLoading, setisLoading] = useState(false);
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);
    const [userCodeInput, setuserCodeInput] = useState('');

    const verifyUser = async () => {

        if (userCodeInput == '') {
            seterrorMessage('Input verification code to contine!');
            return setisError(true);
        }

        setisLoading(true);

        const res = await fetch(`${base_url}/verification`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ userCodeInput })
        })

        if (!res.ok) {
            setisLoading(false);
            seterrorMessage('Wrong confirmation code, please try again!');
            return setisError(true);
        }

        if (res.ok) {
            setShowA(!showA);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    }




    return (
        <>
            {
                (isFormSubmitted) ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: 450, marginTop: 60, marginBottom: 20, backgroundColor: 'white', padding: 25, borderRadius: 0, }}>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={logo}
                                    width="80"
                                    height="80"
                                    className="d-inline-block align-top"
                                    style={{ borderRadius: 50 }}
                                    alt="davidcy360 logo"
                                />
                            </div>

                            <div className='mt-4' style={{ display: 'flex', justifyContent: 'center' }}>
                                <h4>Welcome to DavidCy360</h4>
                            </div>

                            <div style={{ width: '100%', backgroundColor: '#bbdefb', borderWidth: 0.5, borderColor: 'gray', padding: 20, marginTop: 20, }}>

                                <div style={{ marginTop: 5 }}>
                                    <h4>Confirm Email Address</h4>
                                </div>

                                <div style={{ marginTop: 10, fontSize: 12 }}>
                                    <p>A verification Code has been sent to {email}, Check your inbox or spam folder to confirm your Email.</p>
                                </div>

                                <div style={{ marginTop: 20 }}>
                                    <input
                                        name="confirmationCode"
                                        placeholder='Confirmation Code'
                                        type='number'
                                        value={userCodeInput}
                                        style={{ outlineColor: '#0096c7', borderWidth: 1, borderColor: '#5c677d', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setuserCodeInput(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 10 }}>
                                    {(isError) ? <p style={{ color: 'red', fontSize: 13 }}>{errorMessage}*</p> : null}
                                </div>

                                <div style={{ marginTop: 20 }}>
                                    <Button size="sm" variant="secondary" className='w-100'>
                                        {
                                            (isLoading) ?
                                                <img
                                                    src={loader}
                                                    width="30"
                                                    height="30"
                                                    className="d-inline-block"
                                                    style={{ borderRadius: 50 }}
                                                    alt="loader"
                                                />
                                                :
                                                <span onClick={verifyUser}>Verify Email</span>
                                        }
                                    </Button>
                                </div>
                            </div>

                        </div>

                        <ToastContainer
                            className="p-0"
                            position={'top-center'}
                            style={{ zIndex: 100, backgroundColor: 'white' }}
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
                                <Toast.Body>Your registeration was successful! Redirecting to sign in.</Toast.Body>
                            </Toast>
                        </ToastContainer>

                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: "linear-gradient(black, #001233)", height: windowHeight + 60 }}>
                        <div style={{ width: 450, marginTop: 60, marginBottom: 20, backgroundColor: 'white', padding: 25, borderRadius: 0 }}>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={logo}
                                    width="80"
                                    height="80"
                                    className="d-inline-block align-top"
                                    style={{ borderRadius: 50 }}
                                    alt="davidcy360 logo"
                                />
                            </div>

                            <div className='mt-4' style={{ display: 'flex', justifyContent: 'center' }}>
                                <h4>Sign up to DavidCy360</h4>
                            </div>

                            <div>
                                <div style={{ marginTop: 15 }}>
                                    <span>First Name</span>
                                    <input
                                        name="firstName"
                                        placeholder='Enter first name'
                                        type='text'
                                        value={firstName}
                                        style={{ outlineColor: '#0096c7', borderWidth: 1, borderColor: '#5c677d', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setfirstName(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 15 }}>
                                    <span>Last Name</span>
                                    <input
                                        name="LastName"
                                        placeholder='Enter last name'
                                        type='text'
                                        value={lastName}
                                        style={{ outlineColor: '#0096c7', borderWidth: 1, borderColor: '#5c677d', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setlastName(e.target.value)
                                        }}
                                    />

                                </div>

                                <div style={{ marginTop: 15 }}>
                                    <span>Email address</span>
                                    <input
                                        name="email"
                                        placeholder='Enter email'
                                        type='text'
                                        value={email}
                                        style={{ outlineColor: '#0096c7', borderWidth: 1, borderColor: '#5c677d', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setemail(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 15 }}>
                                    <span>Password</span>
                                    <input
                                        name="password"
                                        placeholder='Enter password'
                                        type='password'
                                        value={password}
                                        style={{ outlineColor: '#0096c7', borderWidth: 1, borderColor: '#5c677d', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setpassword(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 15 }}>
                                    <span>Confirm Password</span>
                                    <input
                                        name="ConfirmPassword"
                                        placeholder='Enter confirm password'
                                        type='password'
                                        value={confirmPassword}
                                        style={{ outlineColor: '#0096c7', borderWidth: 1, borderColor: '#5c677d', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setconfirmPassword(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 10 }}>
                                    {(isError) ? <p style={{ color: 'red', fontSize: 13 }}>{errorMessage}*</p> : null}
                                </div>

                                <div style={{ marginTop: 20 }}>
                                    <Button size="sm" variant="dark" className='w-100' onClick={signupUser}>Sign up</Button>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'cnters', flexDirection: 'row', marginTop: 20, fontSize: 14 }}>
                                    <div>Already have an account?</div>
                                    <a href='/Login' style={{ color: 'blue', marginLeft: 5, cursor: 'pointer' }}>Sign in</a>
                                </div>
                            </div>


                        </div>
                    </div>
            }
        </>
    )
}

export default Signup
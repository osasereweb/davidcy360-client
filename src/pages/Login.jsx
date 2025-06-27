import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import logo from '../images/symbolcy360.jpg'
import hide_password from '../images/hide.png'
import view_password from '../images/view.png'
import { useNavigate } from "react-router-dom";
import { CartContext } from '../App';
import loader from '../images/loader3.gif';


function Login() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    const [userCart,
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
        setuserGeneralEmailState
    ] = useContext(CartContext);

    const [gifLoading, setgifLoading] = useState(false);

    const navigate = useNavigate();

    const [passwordToggle, setpasswordToggle] = useState('password');

    const [emailInput, setemailInput] = useState('');
    const [passwordInput, setpasswordInput] = useState('');
    const [errorMessage, seterrorMessage] = useState(``);
    const [isError, setisError] = useState(false);

    const toggleViewPassword = () => {
        if (passwordToggle == 'text') setpasswordToggle('password');
        else setpasswordToggle('text');
    }

    const loginUser = async () => {

        setgifLoading(true);

        if (emailInput == '' || passwordInput == '') {
            setgifLoading(false);
            seterrorMessage('All fields are required!');
            return setisError(true);
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailPattern.test(emailInput);
        if (!isValid) {
            setgifLoading(false);
            seterrorMessage('Invalid email address!');
            return setisError(true);
        }


        const userdata = {
            email: emailInput,
            password: passwordInput
        }


        const res = await fetch(`${base_url}/userLogin`, {
            method: 'POST',
            withCredntials: true,
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userdata)
        })

        const data = await res.json();

        // return console.log(data.email)

        if (res.ok) {
            setgifLoading(false);
            return navigate("/");
        }
        else {
            setgifLoading(false);
            seterrorMessage('Incorrect email or password!')
            setisError(true)
        }
    }





    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 300, height: 300, marginTop: 60 }}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={logo}
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                        style={{ borderRadius: 50 }}
                        alt="davidcy360 logo"
                    />
                </div>

                <div className='mt-4' style={{ display: 'flex', justifyContent: 'center' }}>
                    <h4>Sign in to DavidCy360</h4>
                </div>

                <div style={{ width: '100%', backgroundColor: '#bbdefb', borderWidth: 0.5, borderColor: 'gray', borderRadius: 0, padding: 14, marginTop: 20, }}>
                    <div>
                        <span>Email address</span>
                        <input
                            name="firstName"
                            placeholder='Enter email'
                            type='text'
                            value={emailInput}
                            style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, marginTop: 5, padding: 4 }}
                            onChange={e => {
                                setemailInput(e.target.value)
                            }}
                        />
                    </div>

                    <div style={{ marginTop: 18 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>Password</div>
                            <div style={{ fontSize: 13, color: 'blue', cursor: 'pointer' }}>Forgot password</div>
                        </div>
                        <div style={{ backgroundColor: 'white', borderWidth: 0.5, borderColor: 'gray', borderRadius: 6, marginTop: 5, padding: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input
                                name="firstName"
                                placeholder='Enter password'
                                type={passwordToggle}
                                value={passwordInput}
                                style={{ border: 0, outline: 0, flex: 1, padding: 4 }}
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

                    <div style={{ marginTop: 10, marginBottom: 8 }}>
                        <Button size="sm" variant="secondary" className='w-100' >
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
                                    <span onClick={loginUser}>Sign in</span>
                            }
                        </Button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'cnters', flexDirection: 'row', marginTop: 25, fontSize: 14 }}>
                    <div>New to DavidCy360?</div>
                    <a href='/signup' style={{ color: 'blue', marginLeft: 5, cursor: 'pointer' }}>Create an account</a>
                </div>

            </div>
        </div>
    )
}

export default Login
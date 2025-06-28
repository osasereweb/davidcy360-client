import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import logo from '../images/symbolcy360.jpg'
import hide_password from '../images/hide.png'
import view_password from '../images/view.png'
import { useNavigate } from "react-router-dom";
import { CartContext } from '../App';
import loader from '../images/loader3.gif';




function AdminLogin() {

    let base_url = `https://davidcy360-server.onrender.com`;


    const [gifLoading, setgifLoading] = useState(false);

    const navigate = useNavigate();

    const [passwordToggle, setpasswordToggle] = useState('password');

    const [userNameInput, setuserNameInput] = useState('')
    const [passwordInput, setpasswordInput] = useState('');

    const [errorMessage, seterrorMessage] = useState(``);
    const [isError, setisError] = useState(false);

    const toggleViewPassword = () => {
        if (passwordToggle == 'text') setpasswordToggle('password');
        else setpasswordToggle('text');
    }


    const loginAdmin = async () => {

        setgifLoading(true);

        if (userNameInput == '' || passwordInput == '') {
            seterrorMessage('All fields are required!');
            return setisError(true);
        }


        const userdata = {
            userName: userNameInput,
            password: passwordInput
        }


        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/login`, {
            method: 'POST',
            withCredntials: true,
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userdata)
        })

        const data = await res.json();

        // return console.log(data)

        if (res.ok) {
            setgifLoading(false);
            return navigate("/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-orders");
        }
        else {
            seterrorMessage('Incorrect email or password!');
            setgifLoading(false);
            return setisError(true);
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
                    <h4>DavidCy360 Admin</h4>
                </div>

                <div style={{ width: '100%', backgroundColor: 'pink', borderWidth: 0.5, borderColor: 'gray', borderRadius: 0, padding: 14, marginTop: 20, }}>
                    <div>
                        <span>Username</span>
                        <input
                            name="firstName"
                            placeholder='Enter email'
                            type='text'
                            value={userNameInput}
                            style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, marginTop: 5, padding: 4 }}
                            onChange={e => {
                                setuserNameInput(e.target.value)
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
                                placeholder='Enter username'
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
                                    <span onClick={loginAdmin}>Sign in</span>
                            }
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminLogin
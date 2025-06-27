import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer';
import Header from '../components/Header';
import loader from '../images/loader3.gif';
import Button from 'react-bootstrap/Button';
import hide_password from '../images/hide.png'
import view_password from '../images/view.png'
import check_logo from '../images/check-verified.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';


function ChangePassword() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    const navigate = useNavigate();

    let windowHeight = window.innerHeight;

    const [navheight, setNavheight] = useState(76);

    const [userData, setuserData] = useState({});
    const [isLoading, setisLoading] = useState(true);

    const [passwordToggle, setpasswordToggle] = useState('password');

    const [userEmail, setuserEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [newPasswordConfirm, setnewPasswordConfirm] = useState('')

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



    const changeUserPassword = async () => {
        //check for inputs
        if (newPassword == '' || newPasswordConfirm == '') {
            seterrorMessage('All fields are required to make changes!');
            return setisError(true);
        }

        if (newPassword.length < 8) {
            seterrorMessage('New password too short!');
            return setisError(true);
        }

        if (passwordInput == '') {
            seterrorMessage('Input your previous password to make changes!');
            return setisError(true);
        }

        if (newPassword !== newPasswordConfirm) {
            seterrorMessage('New password does not match!');
            return setisError(true);
        }

        const userdata = {
            email: userEmail,
            password: passwordInput,
            userNewPassword: newPassword
        }

        //all good make request
        setgifLoading(true);
        const res = await fetch(`${base_url}/edith/password`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userdata)
        })

        const data = await res.json();

        if (data.passwordChanged) {
            setgifLoading(false);
            setShowA(true);

            setTimeout(() => {
                setpasswordInput('');
                setnewPassword('');
                setnewPasswordConfirm('');
                seterrorMessage('');
                setisError(false);
                setShowA(false);
            }, 5000);
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
                            <div style={{ width: 350, marginTop: 30, marginBottom: 60 }}>

                                <div className='mt-4' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                    <h5>Change Password</h5>
                                    <p style={{ fontSize: 12 }}>Input new password and confirm password, lastly input your password to save changes.</p>
                                </div>

                                <div style={{ width: '100%', backgroundColor: '#bbdefb', borderWidth: 0.5, borderColor: 'gray', borderRadius: 8, padding: 14, marginTop: 10 }}>
                                    <div>
                                        <span>New password</span>
                                        <input
                                            name="newPassword"
                                            placeholder='Enter new password'
                                            type='password'
                                            value={newPassword}
                                            style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                            onChange={e => {
                                                setnewPassword(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: 18 }}>
                                        <span>Confirm New Password</span>
                                        <input
                                            name="confirmNewPassword"
                                            placeholder='Re-enter new password'
                                            type='password'
                                            value={newPasswordConfirm}
                                            style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, marginTop: 5, padding: 3 }}
                                            onChange={e => {
                                                setnewPasswordConfirm(e.target.value)
                                            }}
                                        />
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

                                    <div style={{ marginTop: 10, marginBottom: 8 }}>
                                        <Button size="sm" variant="secondary" className='w-100'  >
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
                                                    <span onClick={changeUserPassword}>Save</span>
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
                                    <Toast.Body>Your password was changed successfully!</Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                }
            </div>

            <Footer />

        </>
    )
}

export default ChangePassword
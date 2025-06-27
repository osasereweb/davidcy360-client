import React, { useContext, useEffect, useRef, useState } from 'react'

import deleteIcon from '../images/trash.png';
import { CartContext } from '../App';
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




function Settings() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const [imageTitle, setimageTitle] = useState('');
    const [imageSubTitle, setimageSubTitle] = useState('');

    const [aboutUsText, setaboutUsText] = useState('');
    const [imagePreview, setimagePreview] = useState('');

    const [isGifLoading, setisGifLoading] = useState(false);
    const [isGifLoading1, setisGifLoading1] = useState(false)
    const [isError, setisError] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');
    const [isErrorImages, setisErrorImages] = useState(false)

    const [successMessage, setsuccessMessage] = useState('');

    const [imagesArray, setimagesArray] = useState([]);

    const [faqQuestion, setfaqQuestion] = useState('');
    const [faqAnswer, setfaqAnswer] = useState('');


    const handFilleUpload = (e) => {
        setisError(false);
        const file = e.target.files[0];

        let reader = new FileReader();


        reader.onloadend = function () {
            setimagePreview(reader.result);
        }
        reader.readAsDataURL(file);

    }


    const deleteImage = (imageID) => {
        let emptyArray = [];
        imagesArray.map((item, index) => {
            if (item.id !== imageID) {
                emptyArray.push(item)
            }
        })
        setimagesArray([...emptyArray]);
    }





    const addImage = () => {

        if (imagePreview == '' || imageTitle == '' || imageSubTitle == '') {
            seterrorMessage('All fields are required!');
            return setisErrorImages(true);
        }
        let newObject = {
            id: Date.now(),
            url: imagePreview,
            title: imageTitle,
            subTitle: imageSubTitle
        }

        setimagesArray([...imagesArray, newObject])
    }



    const saveSettings = async () => {

        if (imagesArray.length === 0) {
            seterrorMessage('Please add images to continue!')
            return setisErrorImages(true)
        }
        //get all infos
        let newObject = {
            data: imagesArray
        }


        setisGifLoading1(true);
        setisError(false);
        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/save-settings/home-images`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(newObject)
        })

        const data = await res.json();

        if (data.isSaved) {
            setsuccessMessage('Images saved successfully!')
            setisGifLoading1(false);
            return setShowA(true)
        } else {
            seterrorMessage('Could not save to database at the moment!')
            setisGifLoading1(false);
            return setisError(false);

        }
    }



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
                setaboutUsText(data.data[0].aboutUs)
                setimagesArray(data.data[0].images)
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



    const saveAboutUsSetting = async () => {

        if (aboutUsText === '') {
            seterrorMessage('Please fill the text input to continue.')
            return setisError(true)
        }

        let body = {
            text: aboutUsText
        }

        setisGifLoading(true)
        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/save-settings/about-us`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(body)
        })


        const data = await res.json();

        if (data.isSaved) {
            setisGifLoading(false);
            setsuccessMessage('About us changed successfully!')
            return setShowA(true)
        } else {
            setisGifLoading(false);
            seterrorMessage('* Could not save data at this point.');
            return setisError(true);
        }
    }


    const [isFaqError, setisFaqError] = useState(false);
    const [isFaqGifLoading, setisFaqGifLoading] = useState(false)


    const saveFaqSetting = async () => {

        if (faqQuestion == '' || faqAnswer == '') {
            seterrorMessage('*Fill question and answer to save!');
            return setisFaqError(true)
        }

        setisFaqGifLoading(true);

        let bodyData = {
            question: faqQuestion,
            answer: faqAnswer
        }

        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/save-settings/add-faq`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(bodyData)
        })


        const data = await res.json();

        if (data.added) {
            getFaqs()
            setisFaqGifLoading(false);
            setsuccessMessage('FAQ added successfully!')
            setShowA(true)
        } else {
            setisFaqGifLoading(false);
            seterrorMessage('*Cannot save FAQ at this time, please retry!');
            return setisFaqError(true)
        }

    }



    const [allFaqs, setallFaqs] = useState([])


    const getFaqs = async () => {

        const res = await fetch(`${base_url}/davidcy360/all-settings`, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();

        if (data.found) {
            setallFaqs(data.faqs);
        }

    }


    useEffect(() => {
        getFaqs()
    }, [])


    const deleteFaq = async (faqID) => {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this FAQ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {


                        let bodyData = {
                            faqID
                        }

                        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/save-settings/delete-faq`, {
                            withCredntials: true,
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify(bodyData)
                        })


                        const data = await res.json();

                        if (data.deleted) {
                            getFaqs()
                            setsuccessMessage('Faq delete successfully!')
                            setShowA(true);
                        } else {
                            seterrorMessage('*Can not delete FAQ at this time, please retry!')
                            return setisFaqError(true)
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
                                        <a className="nav-link" style={{ color: 'black', }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/add-product">
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
                                        <a className="nav-link" style={{ color: 'black', fontWeight: 'bold' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/settings">
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
                            <h4>Settings (Add Home page images)</h4>
                            <div>
                                <div style={{ marginTop: 12 }}>
                                    <div>Title: </div>
                                    <textarea name="title" rows={3} cols={50}
                                        value={imageTitle}
                                        onChange={e => {
                                            setimageTitle(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <div>Sub title: </div>
                                    <textarea name="sutitle" rows={3} cols={50}
                                        value={imageSubTitle}
                                        onChange={e => {
                                            setimageSubTitle(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18, width: 250, marginBottom: 50 }}>
                                    <div style={{ marginBottom: 10 }}>Product Images (1920 x 985):</div>
                                    <input type="file" name="productImages" id="productImage" onChange={handFilleUpload} />
                                </div>

                                <div style={{ marginTop: 10, marginBottom: 10, fontSize: 12, color: 'red' }}>
                                    {
                                        (isErrorImages) ?
                                            <div>{errorMessage}</div>
                                            :
                                            null
                                    }
                                </div>

                                <Button variant="primary" size='sm' className='mt-2 mb-0'
                                    onClick={addImage}
                                >
                                    Add Image
                                </Button>

                                <div>
                                    <Button variant="success" size='sm' className='mt-3 mb-0'>

                                        {
                                            (isGifLoading1) ?
                                                <img
                                                    src={loader}
                                                    width="30"
                                                    height="30"
                                                    className="d-inline-block"
                                                    style={{ borderRadius: 50 }}
                                                    alt="loader"
                                                />
                                                :
                                                <span onClick={saveSettings} >Save Image Setting</span>
                                        }
                                    </Button>
                                </div>

                                <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>

                                    {
                                        imagesArray.map((item, index) => {
                                            return <div key={index} style={{ width: 250, height: 180, marginRight: 12, position: 'relative', backgroundColor: 'grey', marginTop: 40 }}>
                                                <img width={'100%'} height={'100%'} src={item.url} alt="preview" />
                                                <div style={{ backgroundColor: 'white', borderRadius: 50, width: 30, height: 30, cursor: 'pointer', position: 'absolute', top: 5, right: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                    onClick={() => {
                                                        deleteImage(item.id)
                                                    }}
                                                >
                                                    <img width={20} height={20} src={deleteIcon} alt="remove" style={{}} />
                                                </div>
                                                <div style={{ width: '90%', }}>
                                                    <div style={{
                                                        // width: 150,
                                                        fontSize: 12, overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}>{item.title}</div>
                                                    <div style={{
                                                        // width: 150,s
                                                        fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}>{item.subTitle}</div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>




                                <div style={{ marginTop: 100 }}>
                                    <div>About Us: </div>
                                    <textarea name="productName" rows={3} cols={50}
                                        value={aboutUsText}
                                        onChange={e => {
                                            setaboutUsText(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 10, marginBottom: 10, fontSize: 12, color: 'red' }}>
                                    {
                                        (isError) ?
                                            <div>{errorMessage}</div>
                                            :
                                            null
                                    }
                                </div>

                                <div style={{ marginTop: 15, marginBottom: 20 }}>
                                    <Button variant="success" size='sm' className='mt-3 mb-2' >
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
                                                    saveAboutUsSetting()
                                                }} >Save About us setting</span>
                                        }
                                    </Button>
                                </div>


                                <div style={{ marginTop: 100, marginBottom: 50 }}>
                                    <h5 className='mt-2 mb-3'>Add FAQ (freqquently asked questions)</h5>
                                    <div>
                                        <div>New Question:</div>
                                        <textarea name="title" rows={3} cols={50}
                                            value={faqQuestion}
                                            placeholder='Input New FAQ'
                                            onChange={e => {
                                                setfaqQuestion(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div className='mt-3'>
                                        <div>Answer:</div>
                                        <textarea name="title" rows={3} cols={50}
                                            value={faqAnswer}
                                            placeholder='Input answer'
                                            onChange={e => {
                                                setfaqAnswer(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div>
                                        {
                                            (isFaqError) ?
                                                <span style={{ fontSize: 12, color: 'red' }}>{errorMessage}</span>
                                                :
                                                null
                                        }
                                    </div>

                                    <Button variant="success" size='sm' className='mt-3 mb-2' >
                                        {
                                            (isFaqGifLoading) ?
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
                                                    saveFaqSetting()
                                                }} >Save FAQ</span>
                                        }
                                    </Button>
                                </div>


                                <div className='mt-3 mb-5'>
                                    <Accordion defaultActiveKey="0" style={{ marginTop: 30 }} flush >
                                        <div className='w-100' style={{ textAlign: 'center' }}>
                                            <h5 className='fs-3'>Visible FAQs</h5>
                                        </div>
                                        <div>
                                            {
                                                allFaqs.map((item, index) => {
                                                    return <Accordion.Item className='accordionBtn' eventKey={index} key={index}>
                                                        <Accordion.Header>{item.question}</Accordion.Header>
                                                        <Accordion.Body>
                                                            {item.answer}

                                                            <div className='mt-2'>
                                                                <Button variant="danger" size='sm' className='mt-3 mb-2'
                                                                    onClick={() => {
                                                                        deleteFaq(item.id)
                                                                    }}
                                                                > Delete Faq </Button>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                })
                                            }
                                        </div>
                                    </Accordion>
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
                                <Toast.Body>{successMessage}</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Settings
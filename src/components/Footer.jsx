import React, { useEffect, useRef, useState } from 'react'
// import '../css/Footer.css'
import logo from '../images/symbolcy360.jpg';
import down from '../images/down.png';



function Footer() {
    const footerHeight = useRef(null);

    const nodeRef = useRef(null); // Create a ref

    const [modalIsOpen, setmodalIsOpen] = useState(false)

    // useEffect(() => {
    //     footerHeight.current.clientHeight
    // }, [])

    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;



    const closeModal = () => {
        setmodalIsOpen(false);
    }

    useEffect(() => {
        setTimeout(() => {
            setmodalIsOpen(true);
        }, 5000);
    }, [])


    const toggleModal = () => {
        if (modalIsOpen) setmodalIsOpen(false);
        if (!modalIsOpen) setmodalIsOpen(true)
    }


    return (
        <>

            {
                (modalIsOpen) ?
                    <div style={{ position: 'fixed', color: 'white', width: 300, top: windowHeight - 310, left: windowWidth - 380, backgroundColor: '#000000', borderRadius: 16, padding: 15, animation: 'ease-in-out' }}>
                        {/* modal / */}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <img
                                    src={logo}
                                    width="35"
                                    height="35"
                                    className="d-inline-block align-top"
                                    alt="davidcy360 logo"
                                    style={{ borderRadius: 50 }}
                                />

                                <span className='mx-2'>DavidCy360 </span>
                            </div>
                            <div onClick={closeModal}>
                                <img
                                    src={down}
                                    width="28"
                                    height="28"
                                    className="d-inline-block align-top"
                                    alt="davidcy360 logo"
                                    style={{ borderRadius: 50, cursor: 'pointer' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 25, backgroundColor: '#ffffff50', fontSize: 12, padding: 6, borderRadius: 12 }}>
                            <div >Welcome to DavidCy360</div>

                            <div style={{ marginTop: 25 }}>How may we help you today!</div>

                            <div style={{ marginTop: 3 }}>Reach us on WhatsApp Via - <a href="https://wa.me/message/">https://wa.me/message/</a> </div>
                        </div>
                    </div>
                    :
                    null
            }


            <div onClick={toggleModal} style={{ position: 'fixed', border: '1px solid grey', width: 51.5, height: 51.5, borderRadius: 50, top: windowHeight - 100, left: windowWidth - 120, cursor: 'pointer' }}>
                <img
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="davidcy360 logo"
                    style={{ borderRadius: 50 }}
                />
            </div>


            <div ref={footerHeight} className="container-fluid bg-dark text-bg-dark">
                <footer className="py-5 px-3">
                    <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div className="col-9 col-md-5 mb-3 text-wrap">
                            <h5>Contact</h5>
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light">
                                    Call:</a></li>
                                <li className="nav-item mb-2"><a class="nav-link p-0 text-light">
                                    +2349126314092</a></li>
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light">
                                    Whatsapp:</a></li>
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light">
                                    +2348156578943</a></li>
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light">
                                    Email:</a></li>
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light">
                                    davidcy360@gmail.com</a></li>
                            </ul>
                        </div>

                        <div className="col-9 col-md-3 mb-3">
                            <h5>Support</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="/overview" className="nav-link p-0 text-light">Overview</a>
                                </li>
                                <li className="nav-item mb-2"><a href="/delivery-time-cost" className="nav-link p-0 text-light">Shipping &
                                    Delivery</a>
                                </li>
                                <li className="nav-item mb-2"><a href="/returns-refunds" className="nav-link p-0 text-light">Returns & Refunds</a>
                                </li>
                                <li className="nav-item mb-2"><a href="/perfect-fit-guide" className="nav-link p-0 text-light">Perfect Fit Guide</a>
                                </li>
                                <li className="nav-item mb-2"><a href="/faqs" className="nav-link p-0 text-light">FAQs</a></li>
                            </ul>
                        </div>


                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-center py-2 my-2 border-top ">
                        <p>&copy; 2025 Company, Inc. All rights reserved.</p>
                    </div>
                </footer>
            </div>

        </>
    )
}

export default Footer
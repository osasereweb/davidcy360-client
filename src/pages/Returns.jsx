import React, { useEffect, useRef, useState } from 'react'
import supportLoc from '../images/support-loc.jpg'
import supportPac from '../images/support-pac.jpg'
import supportRet from '../images/support-ret.jpg'
import Footer from '../components/footer';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { faqs } from '../dataSet/faqs';
import '../css/Return.css'
import { useNavigate } from 'react-router-dom';

function Returns() {
    const navigate = useNavigate();


    return (
        <>
            <Header />

            <div className="container px-4 py-5 mt-3" id="featured-3">
                <h5 className="pb-2 border-bottom">Support</h5>
                <div className="row g-4 py-4 row-cols-1 row-cols-lg-2">
                    <div className="feature col-lg-3">
                        <div className="mt-0 mb-2">
                            <a href="/overview" class="mb-4 text-secondary d-block"
                                style={{ textDecoration: 'none' }}>Overview</a>
                            <a href="/delivery-time-cost" className="mb-4 text-secondary d-block"
                                style={{ textDecoration: 'none' }}>Delivery time &
                                cost</a>
                            <a href="returns-refunds" className="mb-4 text-dark d-block fw-bold" style={{ textDecoration: 'none' }}>Returns & refunds</a>
                            <a href="/perfect-fit-guide" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Perfect fit guide</a>
                            {/* <a href="#" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Secure payments</a> */}
                            {/* <a href="#" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Perfect Fit Guide</a> */}
                            <a href="/faqs" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>FAQs</a>
                        </div>
                    </div>
                    <div className="feature col-lg-9 flex-1">
                        <div>
                            <h6>Return a product in 3 steps</h6>
                        </div>
                        <div className="row mt-5">
                            <div className="col-lg-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                <img
                                    src={supportRet}
                                    width={120}
                                    height={120}
                                    className="d-inline-block"
                                    alt="return"
                                />
                                <div style={{ border: '1px solid black', borderRadius: 50, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
                                    <span>1</span>
                                </div>
                                <p className="fs-5 text-body-emphasis  mt-2">Login & cancel order</p>
                                <p>Login and go to My Account.</p>
                            </div>
                            <div className="col-lg-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                <img
                                    src={supportLoc}
                                    width={120}
                                    height={120}
                                    className="d-inline-block"
                                    alt="return"
                                />
                                <div style={{ border: '1px solid black', borderRadius: 50, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
                                    <span>2</span>
                                </div>
                                <p className="fs-5 text-body-emphasis  mt-2">Follow up order cancellation</p>
                                <p>Message us to follow up cancellation - Select a prefered pickup or drop off location.</p>
                            </div>
                            <div className="col-lg-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                <img
                                    src={supportPac}
                                    width={120}
                                    height={120}
                                    className="d-inline-block"
                                    alt="return"
                                />
                                <div style={{ border: '1px solid black', borderRadius: 50, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
                                    <span>3</span>
                                </div>
                                <p className="fs-5 text-body-emphasis  mt-2">Prepare your package</p>
                                <p>Stick the return label on the outside of your package.</p>
                            </div>
                        </div>
                        <div className='my-5 w-100' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                            <Button variant="outline-dark" size='md' onClick={() => {
                                navigate('/profile')
                            }}>Return a Prouct</Button>
                        </div>

                        {/* <div>
                            <Accordion defaultActiveKey="0" style={{ marginTop: 120 }} flush >
                                <div className='w-100' style={{ textAlign: 'center' }}>
                                    <h5 className='fs-3'>FAQ</h5>
                                </div>
                                {
                                    faqs[0].subs.map((item, index) => {
                                        return <Accordion.Item className='accordionBtn' eventKey={index} key={index}>
                                            <Accordion.Header>{item.name}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.desc}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    })
                                }
                            </Accordion>
                        </div> */}

                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default Returns
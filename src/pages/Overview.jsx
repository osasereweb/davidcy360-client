import React, { useEffect, useRef, useState } from 'react'
import tipCall from '../images/tip-call.png'
import tipWhatsapp from '../images/tip-whatsapp.png'
import tipEmail from '../images/tip-email.png'
import Footer from '../components/footer';
import Header from '../components/Header';


function Overview() {


    return (
        <>
            <Header />

            <div className="container px-4 py-5 mt-3" id="featured-3">
                <h5 className="pb-2 border-bottom">Support</h5>
                <div className="row g-4 py-4 row-cols-1 row-cols-lg-2">
                    <div className="feature col-lg-3">
                        <div className="mt-0 mb-2">
                            <a href="/overview" class="mb-4 text-dark d-block fw-bold"
                                style={{ textDecoration: 'none' }}>Overview</a>
                            <a href="/delivery-time-cost" className="mb-4 text-secondary d-block"
                                style={{ textDecoration: 'none' }}>Delivery time &
                                cost</a>
                            <a href="/returns-refunds" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Returns & refunds</a>
                            <a href="/perfect-fit-guide" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Perfect fit guide</a>
                            <a href="/faqs" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>FAQs</a>
                        </div>
                    </div>
                    <div className="feature col-lg-9 flex-1">
                        <div className="row mb-4">
                            <div className="col-lg-6">
                                <img
                                    src={tipCall}
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                    alt="davidcy360 logo"
                                />
                                <p className="fs-5">Call Us</p>
                                <p><span className="fw-bold">+23481516576943</span> We are available from Monday till Sunday, 9:00
                                    - 22:00 CET.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <img
                                    src={tipEmail}
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                    alt="davidcy360 logo"
                                />
                                <p className="fs-5 ">Email</p>
                                <p>Send us a mail on DAVIDCY360africa.com. We will reply to you as soon as possible.
                                </p>
                            </div>
                            <div className="col-lg-6 mt-5">
                                <img
                                    src={tipWhatsapp}
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                    alt="davidcy360 logo"
                                />
                                <p className="fs-5 ">Whatsapp</p>
                                <p>Reach us on <span className="fw-bold">+23481516576943</span> (free).
                                </p>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-lg-6">
                                <p className="fs-5 text-body-emphasis">Return</p>
                                <p>Should your Suitsupply purchase not meet your expectations, you may return the product(s)
                                    within 30 days after delivery for a refund or exchange.
                                </p>
                                <a href="/returns-refunds" className="text-primary fs-6" style={{ textDecoration: 'none' }}>Read More</a>
                            </div>
                            {/* <div className="col-lg-6">
                                <p className="fs-5 text-body-emphasis">Payments</p>
                                <p>We accept Visa, MasterCard, American Express and PayPal. In addition, we offer various local
                                    payment methods in many countries.
                                </p>
                                <a href="#" className="text-primary fs-6" style={{ textDecoration: 'none' }}>Read More</a>
                            </div> */}
                            <div className="col-lg-6">
                                <p className="fs-5 text-body-emphasis">Delivery</p>
                                <p>Suitsupply's estimated delivery time and shipping fee vary per country. Your products will be
                                    delivered through high-quality courier services.
                                </p>
                                <a href="/delivery-time-cost" className="text-primary fs-6" style={{ textDecoration: 'none' }}>Read More</a>
                            </div>
                            {/* <div className="col-lg-6 mt-5">
                                <p className="fs-5 text-body-emphasis">Tailoring</p>
                                <p>Suitsupply prides itself on creating suits that fit perfectly. Additionally, we offer an
                                    in-store alterations service by skilled tailors.
                                </p>
                                <a href="#" className="text-primary fs-6" style={{ textDecoration: 'none' }}>Read More</a>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>


            {/* footer  */}
            <Footer />

        </>
    )
}

export default Overview
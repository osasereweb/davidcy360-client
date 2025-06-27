import React, { useContext, useEffect, useRef, useState } from 'react'
import Footer from '../components/footer';
import Header from '../components/Header';
import { CartContext } from '../App';



function Delivery() {

    const [
        userCart,
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
        setuserGeneralEmailState,
        currencyRate,
        setcurrencyRate,
        currencyArray,
        setcurrencyArray,
        updateCurrencyArray,
        updateCurrentCurrency
    ] = useContext(CartContext);



    return (
        <>
            <Header />

            <div className="container px-4 py-5 mt-3" id="featured-3">
                <h5 className="pb-2 border-bottom">Support</h5>
                <div className="row g-4 py-4 row-cols-1 row-cols-lg-2">
                    <div className="feature col-lg-3">
                        <div className="mt-0 mb-2">
                            <a href="/overview" className="mb-4 text-secondary d-block "
                                style={{ textDecoration: 'none' }}>Overview</a>
                            <a href="/delivery-time-cost" className="mb-4 text-dark d-block fw-bold"
                                style={{ textDecoration: 'none' }}>Delivery time &
                                cost</a>
                            <a href="/returns-refunds" class="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Returns & refunds</a>
                            {/* <a href="#" class="mb-4 text-secondary d-block" style="text-decoration: none;">Secure payments</a>
                    <a href="#" class="mb-4 text-secondary d-block" style="text-decoration: none;">Perfect Fit Guide</a> */}
                            <a href="/perfect-fit-guide" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Perfect fit guide</a>
                            <a href="/faqs" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>FAQs</a>
                        </div>
                    </div>
                    <div className="feature col-lg-9 flex-1">
                        <div className="fs-5 mb-3 fw-500">Delivery time & cost</div>
                        <p>Suitsupply's estimated delivery time and shipping fees vary by country. We aim to deliver all orders
                            within 3 to 4 business days worldwide, but many countries are eligible for next-day and two-day
                            delivery. Outlet sales might take up to 7+ business days. Please see below for more information.</p>

                        <div className="fs-5 mb-3 mt-5 fw-500">Europe</div>
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>Delivery time</th>
                                        <th>Delivery cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>United States</td>
                                        <td>2-3 weeks</td>
                                        <td>{currencyRate.sign}{(120000 / currencyRate.rate).toFixed(2)} - {currencyRate.sign}{(150000 / currencyRate.rate).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Europe</td>
                                        <td>2-3 weeks</td>
                                        <td>{currencyRate.sign}{(120000 / currencyRate.rate).toFixed(2)} - {currencyRate.sign}{(150000 / currencyRate.rate).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Asia</td>
                                        <td>2-3 weeks</td>
                                        <td>{currencyRate.sign}{(180000 / currencyRate.rate).toFixed(2)} - {currencyRate.sign}{(200000 / currencyRate.rate).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Africa</td>
                                        <td>2-3 weeks</td>
                                        <td>{currencyRate.sign}{(50000 / currencyRate.rate).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Nigeria</td>
                                        <td>5 day</td>
                                        <td>{currencyRate.sign}{(10000 / currencyRate.rate).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Others</td>
                                        <td>2-3 weeks</td>
                                        <td>{currencyRate.sign}{(120000 / currencyRate.rate).toFixed(2)} - {currencyRate.sign}{(150000 / currencyRate.rate).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Delivery
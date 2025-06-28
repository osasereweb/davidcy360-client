import React, { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';

function PerfectFitGuide() {

    const [sizes, setsizes] = useState([
        {
            size: 'XS',
            chest: '36 - 38',
            waist: '26 - 28',
            hips: '36 - 38'
        },
        {
            size: 'S',
            chest: '38 - 40',
            waist: '28 - 30',
            hips: '38 - 40'
        },
        {
            size: 'M',
            chest: '40 - 44',
            waist: '30 - 34',
            hips: '40 - 44'
        },
        {
            size: 'L',
            chest: '44 - 48',
            waist: '34 - 38',
            hips: '44 - 48'
        },
        {
            size: 'XL',
            chest: '48 - 52',
            waist: '38 - 42',
            hips: '48 - 52'
        },
        {
            size: '2X',
            chest: '52 - 56',
            waist: '42 - 46',
            hips: '52 - 56'
        },
        {
            size: '3X',
            chest: '56 - 61',
            waist: '46 - 51',
            hips: '56 - 61'
        },
        {
            size: '4X',
            chest: '61 - 66',
            waist: '51 - 56',
            hips: '61 - 66'
        },
        {
            size: '5X',
            chest: '66 - 75.5',
            waist: '56 - 63.5',
            hips: '66 - 75.5'
        },
        {
            size: '6X',
            chest: '75.5 - 81',
            waist: '63.5 - 71',
            hips: '75.5 - 81'
        },
    ]);



    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <div className="container px-4 py-5 mt-3" id="featured-3">
                <h5 className="pb-2 border-bottom">Support</h5>
                <div className="row g-4 py-4 row-cols-1 row-cols-lg-2">
                    <div className="feature col-lg-3">
                        <div className="mt-0 mb-2">
                            <a href="/overview" className="mb-4 text-secondary d-block "
                                style={{ textDecoration: 'none' }}>Overview</a>
                            <a href="/delivery-time-cost" className="mb-4 text-secondary  d-block "
                                style={{ textDecoration: 'none' }}>Delivery time &
                                cost</a>
                            <a href="/returns-refunds" class="mb-4 text-secondary   d-block" style={{ textDecoration: 'none' }}>Returns & refunds</a>
                            {/* <a href="#" class="mb-4 text-secondary d-block" style="text-decoration: none;">Secure payments</a>
                    <a href="#" class="mb-4 text-secondary d-block" style="text-decoration: none;">Perfect Fit Guide</a> */}
                            <a href="/perfect-fit-guide" className="mb-4  text-dark fw-bold d-block" style={{ textDecoration: 'none' }}>Perfect fit guide</a>
                            <a href="/faqs" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>FAQs</a>
                        </div>
                    </div>
                    <div className="feature col-lg-9 flex-1">
                        <div className="fs-5 mb-3 fw-500">Body Measurements</div>
                        <p>Measurements are in inchs</p>

                        <div className="fs-5 mb-3 mt-3 fw-500"> Size Chart </div>
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>CHEST</th>
                                        <th>WAIST</th>
                                        <th>HIPS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sizes.map((item, index) => {
                                            return <tr>
                                                <td>{item.size}</td>
                                                <td>{item.chest}</td>
                                                <td>{item.waist}</td>
                                                <td>{item.hips}</td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />


        </div>
    )
}

export default PerfectFitGuide
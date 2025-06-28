import React, { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Accordion from 'react-bootstrap/Accordion';
import { faqs } from '../dataSet/faqs';


function Faqs() {

    let base_url = `https://davidcy360-server.onrender.com`;

    const [allFaqs, setallFaqs] = useState([])


    const getSettings = async () => {

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
        getSettings()
    }, [])



    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                            <a href="returns-refunds" className="mb-4 text-secondary d-block " style={{ textDecoration: 'none' }}>Returns & refunds</a>
                            <a href="/perfect-fit-guide" className="mb-4 text-secondary d-block" style={{ textDecoration: 'none' }}>Perfect fit guide</a>
                            <a href="/faqs" className="mb-4 text-dark d-block fw-bold" style={{ textDecoration: 'none' }}>FAQs</a>
                        </div>
                    </div>
                    <div className="feature col-lg-9 flex-1">

                        <div>
                            <Accordion defaultActiveKey="0" style={{ marginTop: 30 }} flush >
                                <div className='w-100' style={{ textAlign: 'center' }}>
                                    <h5 className='fs-3'>FAQ</h5>
                                </div>
                                {
                                    allFaqs.map((item, index) => {
                                        return <Accordion.Item className='accordionBtn' eventKey={index} key={index}>
                                            <Accordion.Header>{item.question}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.answer}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    })
                                }
                            </Accordion>
                        </div>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Faqs
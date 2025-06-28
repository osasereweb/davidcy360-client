import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import check_logo from '../images/check-verified.png';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Payment() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <div className='my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <img
                                width={45}
                                height={45}
                                src={check_logo}
                                className="d-inline-block"
                                alt="cart"
                            />

                            <div style={{ marginLeft: 15, fontSize: 18 }}>
                                Payment Successfull!
                            </div>

                        </div>
                        <div style={{ marginTop: 20, fontSize: 14 }}>
                            Congratulations! your payment was approved, and your package has been added to the queue, check your order dashboard to follow up your order. Thank you.
                        </div>
                        <Button variant="info" className='w-100 mt-4' size='sm' >Continue shopping</Button>
                        <Button variant="dark" className='w-100 my-3' size='sm' >View orders</Button>
                    </Card.Body>
                </Card>
            </div>

            <Footer />
        </div>
    )
}

export default Payment
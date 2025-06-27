import React, { useContext, useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import bg1 from '../images/bg-1.jpg';
import loader from '../images/loader3.gif';
import deleteIcon from '../images/trash.png';
import { CartContext } from '../App';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import check_logo from '../images/check-verified.png';
import Modal from 'react-bootstrap/Modal';
import cartClipArt from '../images/cartClipArt.png';
import { useNavigate } from 'react-router-dom';



function WishLists() {

    const navigate = useNavigate();


    const [gifLoading, setgifLoading] = useState(false);
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const [userEmail, setuserEmail] = useState('');
    const [userData, setuserData] = useState('');

    const [error, seterror] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');


    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);


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


            <div className="container px-4 py-5 mt-2" id="featured-3">
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-2">

                    <div className="feature col-lg-12 flex-1">
                        <div >
                            <div className="fs-4 mb-4 fw-500 fw-bold">My Wishlist</div>

                            {
                                (userWishList.length == 0) ?
                                    <div style={{ marginTop: 30, }}>
                                        <div style={{ fontSize: 22 }}>No item added to wishlist yet!</div>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <div style={{ marginTop: 20 }}>
                                                <img
                                                    src={cartClipArt}
                                                    width={120}
                                                    height={120}
                                                    className="d-inline-block"
                                                    alt="cart"
                                                />
                                            </div>

                                            <div>
                                                <Button variant="outline-primary" size='sm' className='mt-5 mb-2' >Continue shopping</Button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <Table
                                            bordered={false}
                                        // striped="columns"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price per product</th>
                                                    <th>Available Quantity</th>
                                                    <th>Category</th>
                                                    <th>Size</th>
                                                    <th> &nbsp; &nbsp; &nbsp; </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userWishList.map((item, index) => {

                                                        return <tr key={index} style={{ flex: 1, width: '100%' }} >
                                                            <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}
                                                                onClick={() => {

                                                                    navigate(`/product/${item.name}`, {
                                                                        state: {
                                                                            id: item.id, name: item.name, description: item.description, price: item.price, currency: item.currency, quantity: item.quantity, url: item.url, sizes: item.sizes, weight: item.weight, soldOut: item.soldOut, category: item.category
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                <div style={{ marginRight: 10 }}>
                                                                    <img
                                                                        src={item.url[0].link}
                                                                        width={80}
                                                                        height={80}
                                                                        className="d-inline-block"
                                                                        alt="cart"
                                                                    />
                                                                </div>
                                                                <div style={{
                                                                    width: '85%',
                                                                    textOverflow: 'ellipsis',
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: 'vertical'
                                                                }}>{item.name}</div>
                                                            </td>

                                                            <td style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    marginRight: 15
                                                                }}
                                                                >
                                                                    {currencyRate.sign}{(item.price / Number(currencyRate.rate)).toFixed(2)}
                                                                </div>
                                                            </td>

                                                            <td style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    marginRight: 15
                                                                }}
                                                                >
                                                                    {item.availableQuantity}
                                                                </div>
                                                            </td>

                                                            <td style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                }}>

                                                                    <div style={{ marginLeft: 10, marginRight: 10 }}>{item.category}</div>

                                                                </div>
                                                            </td>

                                                            <td style={{ position: 'relative' }}>
                                                                <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        left: '50%',
                                                                        top: '50%',
                                                                        transform: 'translate(-50%, -50%)'
                                                                    }}
                                                                >
                                                                    {currencyRate.sign}{((Number(item.price) * Number(item.quantity)) / Number(currencyRate.rate)).toFixed(2)}
                                                                </div>
                                                            </td>

                                                            <td style={{ position: 'relative' }}>
                                                                <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        left: '50%',
                                                                        top: '50%',
                                                                        transform: 'translate(-50%, -50%)'
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={deleteIcon}
                                                                        width={20}
                                                                        height={20}
                                                                        className="d-inline-block"
                                                                        alt="cart"
                                                                        onClick={() => {
                                                                            removeFromUserWishList(item.id);
                                                                        }}
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    })
                                                }

                                            </tbody>
                                        </Table>
                                        <Button variant="outline-primary" size='md' className='mt-4 mb-2' >Continue Shopping</Button>
                                    </>
                            }

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
                            <Toast.Body>Your packages have been added to queue successfully!</Toast.Body>
                        </Toast>
                    </ToastContainer>



                    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delivey Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>*Select your preferred delivery address.</div>

                            <div style={{ marginTop: 20, fontSize: 20 }}>
                                {
                                    (userData.length !== 0) ?
                                        <div>
                                            {
                                                userData.address.map((item, index) => {
                                                    return <label key={index}>
                                                        <input type="radio" name="myRadio" value={`${item.address1} ${item.zipCode} ${item.country.value} ${item.country.label} ${item.userNumber}`} onChange={(e) => {
                                                            setuserDeliveryAddress(e.target.value);
                                                            getUserDeliveryFee(item.region.value, item.country.label);
                                                            setisDeliveryAddressSelected(true);

                                                        }} />
                                                        {item.address1} {item.zipCode} {item.country.value} {item.country.label} {item.userNumber}
                                                    </label>
                                                })
                                            }

                                            <div>
                                                {
                                                    (isDeliveryAddressSelected) ?
                                                        <Button variant="primary" size='md' className='mt-5 mb-2' onClick={() => {
                                                            setShow(false)
                                                        }} >Save & continue</Button>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>

                        </Modal.Body>
                    </Modal>
                </div>


            </div>

            <Footer />

        </>
    )
}

export default WishLists
import React, { useContext, useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import bg1 from '../images/bg-1.jpg';
import loader from '../images/loader3.gif';
import deleteIcon from '../images/trash.png';
import paystack_img from '../images/paystack.png';
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
import PaystackPop from '@paystack/inline-js'


function CartPage() {

    let base_url = `https://davidcy360-server.onrender.com`;

    const navigate = useNavigate();

    const [totalAmount, settotalAmount] = useState(0);
    const [userShippingFee, setuserShippingFee] = useState(0);

    const [gifLoading, setgifLoading] = useState(false);
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const [userEmail, setuserEmail] = useState('');
    const [userData, setuserData] = useState('');

    const [error, seterror] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');




    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);



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
            setuserData(data.data);
            setuserEmail(data.data.email)

        } else {
            return navigate("/login")
        }

    }


    useEffect(() => {
        checkAuthorization();
    }, [])



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



    const increaseQuantity = (productId) => {

        //find item by id
        let emptyArray = [];

        userCart.map((item, index) => {

            if (item.id === productId) {
                //change the quantity
                let newQuantity = Number(item.quantity) + 1;
                item.quantity = newQuantity;
            }
            emptyArray.push((item));

        })

        setuserCart(emptyArray);
        localStorage.setItem("storedUserCart", JSON.stringify(emptyArray));

    }


    const decreaseQuantity = (productId) => {
        //find item by id
        let emptyArray = [];

        userCart.map((item, index) => {
            if (item.id === productId) {
                //change the quantity
                let newQuantity = Number(item.quantity) - 1;
                item.quantity = newQuantity;
            }
            emptyArray.push((item));
        })

        setuserCart(emptyArray);
        localStorage.setItem("storedUserCart", JSON.stringify(emptyArray));

    }


    const updateTotalAmount = () => {

        if (userCart.length == 0) {
            settotalAmount(0);
            return
        }

        let sum = 0;
        userCart.map((item, index) => {
            sum += item.price * item.quantity;
            settotalAmount(sum);
        })
    }


    useEffect(() => {

        updateTotalAmount()

    }, [, userCart])



    const [isDeliveryAddressSelected, setisDeliveryAddressSelected] = useState(false);
    const [userDeliveryAddress, setuserDeliveryAddress] = useState('');

    const [deliveryTime, setdeliveryTime] = useState('')


    //send orders to backend
    const postOrders = async () => {


        // userCart.totalAmount = totalAmount;
        let packageID = `MP${Date.now()}`;
        let todayDate = new Date().toLocaleString();

        //date created, days to recieve package, date of package recieved


        // return console.log(new Date().toLocaleDateString())


        const userdata = {
            orders: userCart,
            email: userData.email,
            dateOfOrder: todayDate,
            deliveryPeriod: deliveryTime,
            dateOfDelivery: 'Pending',
            status: 'Pending',
            deliveryAddress: userDeliveryAddress,
            userData: [
                {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    address: userData.address
                }
            ],
            totalAmount,
            packageID
        }


        const res = await fetch(`${base_url}/edith/post-cart-orders`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userdata)
        })

        const data = await res.json();

        if (data.cartAdded) {
            setgifLoading(false);
            setShowA(true);
        } else {
            setgifLoading(false);
        }

    }



    const getUserDeliveryFee = (region, country) => {

        let totalWeight = 0;
        //get usercart weight
        userCart.map((item, index) => {
            totalWeight = totalWeight + (Number(item.weight) * Number(item.quantity));
        })


        let weightAmount = 0;

        if (country === "Nigeria") {
            //get the weight (2500 per 1kg)
            weightAmount = Math.ceil(Number(totalWeight) * 2500)
            setuserShippingFee(weightAmount);
            return setdeliveryTime('5 days');
        }



        switch (region) {

            case 'South America':
                //get the weight (37,500 per 1kg)
                weightAmount = Math.ceil(Number(totalWeight) * 37500)
                setuserShippingFee(weightAmount);
                setdeliveryTime('2-3 weeks');
                break;

            case 'North America':
                //get the weight (37,500 per 1kg)
                weightAmount = Math.ceil(Number(totalWeight) * 37500)
                setuserShippingFee(weightAmount);
                setdeliveryTime('2-3 weeks');
                break;

            case 'Europe':
                //get the weight (37,500 per 1kg)
                weightAmount = Math.ceil(Number(totalWeight) * 37500)
                setuserShippingFee(weightAmount);
                setdeliveryTime('2-3 weeks');
                break;

            case 'Asia':
                //get the weight (50,000 per 1kg)
                weightAmount = Math.ceil(Number(totalWeight) * 50000)
                setuserShippingFee(weightAmount);
                setdeliveryTime('2-3 weeks');
                break;

            case 'Africa':
                //get the weight (12,500 per 1kg)
                weightAmount = Math.ceil(Number(totalWeight) * 12500)
                setuserShippingFee(weightAmount);
                setdeliveryTime('2 weeks');
                break;

            default:
                //get the weight (37,500 per 1kg)
                weightAmount = Math.ceil(Number(totalWeight) * 37500)
                setuserShippingFee(weightAmount);
                setdeliveryTime('2-3 weeks');
                break;
        }
    }



    const makePayment = async () => {

        //all good make request (loading request)
        setgifLoading(true);

        if (userData.address.length === 0) {
            seterrorMessage('*Please Add a delivery Address to proceed! Goto profile page to add address.');
            setgifLoading(false);
            return seterror(true);
        }


        if (!isDeliveryAddressSelected) {
            setgifLoading(false);
            return setShow(true);
        }

        const res = await fetch(`${base_url}/paystack?email=${userEmail}&amount=${(userShippingFee + totalAmount) * 100}`, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();



        if (data.status) {

            setgifLoading(false);

            const popup = new PaystackPop()
            popup.resumeTransaction(data.data?.access_code, {
                onSuccess: (transaction) => {
                    postOrders()
                },
                onCancel: () => {
                    seterrorMessage('*Payment cancelled, please retry to continue!');
                    return seterror(true)
                },
                onError: () => {
                    seterrorMessage('*There was an error while trying to make payment, please retry to continue!');
                    return seterror(true)
                }
            });

            // const redirectUrl = data.data?.authorization_url;
            // const callbackParam = postOrders();
            // const fullRedirectUrl = `${redirectUrl}?callback=${encodeURIComponent(callbackParam)}`;

            // // Perform the redirect
            // window.location.href = fullRedirectUrl;
            // // or, if you don't want the user to be able to go back to the previous page:
            // // window.location.replace(fullRedirectUrl);
        } else {
            setgifLoading(false);
            seterrorMessage('*Could not load payment page at the moment, please retry!');
            return seterror(true)
        }

    }




    return (
        <>
            <Header />

            <div className="container px-4 py-5 mt-2" id="featured-3">
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-2">
                    <div className="feature col-lg-3">
                        <div className="mt-0 mb-2">
                            <Card className='bg-light' style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Ordr Details</Card.Title>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                        <div style={{ fontWeight: 'bold' }}>Total </div>
                                        <div>{currencyRate.sign}{(totalAmount / Number(currencyRate.rate)).toFixed(2)}</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <div style={{ fontWeight: 'bold' }}>Shipping Fee </div>
                                        <div>{currencyRate.sign}{(userShippingFee / Number(currencyRate.rate)).toFixed(2)}</div>
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                                        <div style={{ fontWeight: 'bold' }}>Total Amount: </div>
                                        <div>{currencyRate.sign}{((userShippingFee + totalAmount) / Number(currencyRate.rate)).toFixed(2)} {currencyRate.symbol}</div>
                                    </div>

                                    <div style={{ marginTop: 15 }}>
                                        {
                                            (error) ?
                                                <div style={{ fontSize: 12, color: 'red' }}>{errorMessage}</div>
                                                :
                                                null
                                        }
                                    </div>
                                    {
                                        (userCart.length == 0) ?
                                            null
                                            :
                                            <Button variant="success" className='mt-4 w-100' size='md' >
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
                                                        <span onClick={() => {
                                                            makePayment()
                                                        }}>Pay {currencyRate.sign}{((userShippingFee + totalAmount) / Number(currencyRate.rate)).toFixed(2)} {currencyRate.symbol}</span>
                                                }
                                            </Button>
                                    }
                                </Card.Body>
                            </Card>

                            <div className='mt-3 p-2' style={{ border: '1px solid grey', borderRadius: 12, width: 'fit-content' }}>
                                <img
                                    src={paystack_img}
                                    width={120}
                                    height="15"
                                    className="d-inline-block"
                                    style={{ borderRadius: 12 }}
                                    alt="loader"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="feature col-lg-9 flex-1">
                        <div >
                            <div className="fs-4 mb-4 fw-500 fw-bold">My Cart</div>

                            {
                                (userCart.length == 0) ?
                                    <div style={{ marginTop: 30, }}>
                                        <div style={{ fontSize: 22 }}>No item added to cart yet!</div>
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

                                            {/* <div>
                                                <Button variant="primary" size='md' className='mt-5 mb-2' >Continue shopping</Button>
                                            </div> */}
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <Table
                                            bordered={false}
                                            responsive={true}
                                        // striped="columns"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price per product</th>
                                                    <th>Available Quantity</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                    <th>color</th>
                                                    <th>Size</th>
                                                    <th> &nbsp; &nbsp; &nbsp; </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userCart.map((item, index) => {

                                                        return <tr key={index} style={{ flex: 1, width: '100%', }}>
                                                            <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                                                                    {currencyRate.sign}{item.price}
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
                                                                    <div>
                                                                        {
                                                                            (item.quantity < 2) ?
                                                                                null
                                                                                :
                                                                                <Button variant="secondary" size='sm' onClick={() => {
                                                                                    decreaseQuantity(item.id)
                                                                                }}>-</Button>
                                                                        }
                                                                    </div>
                                                                    <div style={{ marginLeft: 10, marginRight: 10 }}>{item.quantity}</div>
                                                                    <div>
                                                                        {
                                                                            (item.quantity >= item.availableQuantity) ?
                                                                                null
                                                                                :
                                                                                <Button variant="success" size='sm' onClick={() => {
                                                                                    increaseQuantity(item.id)
                                                                                }}>+</Button>
                                                                        }
                                                                    </div>
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
                                                                    {item.selectedColor}
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
                                                                    {item.selectedSize}
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
                                                                            removeFromUserCart(item.id);
                                                                            updateTotalAmount();
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
                                        {/* <Button variant="outline-primary" size='md' className='mt-4 mb-2' >Continue Shopping</Button> */}
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

export default CartPage
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import loader from '../images/loader3.gif';
import Button from 'react-bootstrap/Button';
import bg1 from '../images/bg-1.jpg';
import circle from '../images/circle.png';
import Footer from '../components/footer';
import Header from '../components/Header';
import check_logo from '../images/check-verified.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useLocation } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CartContext } from '../App';
import { Alert } from 'bootstrap';
import styled from "styled-components";
import ProductCard from '../components/ProductCard';



const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  padding: 50px;
  border: 1px solid grey;
  border-radius: 15px;
  :hover {
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.55), 0 14px 18px rgba(0, 0, 0, 0.55);
  }
`;

const Image = styled.img.attrs((props) => ({
    src: props.source
}))``;

const Target = styled(Image)`
  position: absolute;
  left: ${(props) => props.offset.left}px;
  top: ${(props) => props.offset.top}px;
  opacity: ${(props) => props.opacity};
`;



function ProductDetails() {
    const navigate = useNavigate();
    const location = useLocation();


    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    let windowHeight = window.innerHeight;

    const [userData, setuserData] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [navheight, setNavheight] = useState(76);

    const [hasAddedCart, sethasAddedCart] = useState(false);
    const [hasAddedWishList, sethasAddedWishList] = useState(false)

    const [toastMessage, settoastMessage] = useState('');
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const [selectedSize, setselectedSize] = useState('');
    const [isSelectedSize, setisSelectedSize] = useState(false);

    const selectSize = (size) => {
        if (!isSelectedSize) {
            setselectedSize(size);
            setisSelectedSize(true);
        } else if (isSelectedSize && selectedSize !== '') {
            setselectedSize(size);
        } else {
            setselectedSize('');
        }
    }



    const [selectedColor, setselectedColor] = useState('');
    const [isSelectedColor, setisSelectedColor] = useState(false);

    const selectColor = (color) => {
        if (!isSelectedColor) {
            setselectedColor(color);
            setisSelectedColor(true);
        } else if (isSelectedColor && selectedColor !== '') {
            setselectedColor(color);
        } else {
            setselectedColor('');
        }
    }




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

    const carted = isCart(location.state.id);
    const wished = isWishList(location.state.id);




    const [errorMessage, seterrorMessage] = useState('');
    const [error, seterror] = useState(false);

    const addCart = () => {
        if (selectedSize == '') {
            seterrorMessage('Please select size before adding to cart! Or goto the sizing section for help.');
            return seterror(true);
        }

        if (selectedColor == '') {
            seterrorMessage('Please select color before adding to cart!');
            return seterror(true);
        }

        settoastMessage('Item added successfully!');
        location.state.size = selectedSize;
        location.state.color = selectedColor;
        location.state.availableQuantity = location.state.quantity;

        addToUserCart(location.state);

        setShowA(true);
        sethasAddedCart(true);

        setTimeout(() => {
            setShowA(false);
        }, 5000);
    }


    const addWishList = () => {
        settoastMessage('Item added to wishlist successfully!');

        location.state.availableQuantity = location.state.quantity;

        addToUserWishList(location.state);

        setShowA(true);
        sethasAddedWishList(true)

        setTimeout(() => {
            setShowA(false);
        }, 5000);
    }



    const removeCart = (id) => {
        settoastMessage('Item removed successfully!');
        removeFromUserCart(id);
        setShowA(true);
        sethasAddedCart(false);

        setTimeout(() => {
            setShowA(false);
        }, 5000);
    }



    const removeWishList = (id) => {

        settoastMessage('Item removed from wishlist successfully!');
        removeFromUserWishList(id);
        setShowA(true);
        sethasAddedWishList(false);

        setTimeout(() => {
            setShowA(false);
        }, 5000);

    }



    useLayoutEffect(() => {

        const carted = isCart(location.state.id);

        //get cart size fro local storage user cart
        // setselectedSize();
        userCart.map((item, index) => {
            if (item.id == location.state.id) {
                setselectedSize(item.size);
                setselectedColor(item.color)
            }
        })

        if (selectedSize !== '') {
            setisSelectedSize(true)
        }
        if (selectedColor !== '') {
            setisSelectedColor(true)
        }

        if (carted) {
            sethasAddedCart(true);
        }


    }, [, hasAddedCart, userCart])




    useLayoutEffect(() => {

        const wished = isWishList(location.state.id);

        //get cart size fro local storage user cart
        // setselectedSize();
        // userWishList.map((item, index) => {
        //     if (item.id == location.state.id) {
        //         setselectedSize(item.selectedSize);
        //     }
        // })

        // if (selectedSize !== '') {
        //     setisSelectedSize(true)
        // }

        if (wished) {
            sethasAddedWishList(true);
        }


    }, [, hasAddedWishList, userWishList])




    const sourceRef = useRef(null);
    const targetRef = useRef(null);
    const containerRef = useRef(null);

    const [opacity, setOpacity] = useState(0);
    const [offset, setOffset] = useState({ left: 0, top: 0 });

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const handleMouseMove = (e) => {
        const targetRect = targetRef.current.getBoundingClientRect();
        const sourceRect = sourceRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const xRatio = (targetRect.width - containerRect.width) * 10 / sourceRect.width;
        const yRatio =
            (targetRect.height - containerRect.height) * 10 / sourceRect.height;

        const left = Math.max(
            Math.min(e.pageX - sourceRect.left, sourceRect.width),
            0
        );
        const top = Math.max(
            Math.min(e.pageY - sourceRect.top, sourceRect.height),
            0
        );

        setOffset({
            left: left * -xRatio,
            top: top * -yRatio
        });
    };



    const [page, setpage] = useState(1);

    const [isLoadingMoreProducts, setisLoadingMoreProducts] = useState(false);
    const [relatedProducts, setrelatedProducts] = useState([])





    const getRelatedProducts = async () => {

        setisLoadingMoreProducts(true);

        const res = await fetch(`${base_url}/davidcy360/all-products/category?limit=6&page=${page}&category=${location.state.category}`, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();

        if (data.loaded) {
            setisLoadingMoreProducts(false)
            let newArray = [...relatedProducts, ...data.data]

            setrelatedProducts(newArray);
        } else {
            setisLoadingMoreProducts(false)
        }

    }

    useEffect(() => {

        getRelatedProducts()

    }, [page])






    return (
        <>
            <Header />

            <div style={{
                width: '100%',
                display: "flex",
                justifyContent: 'centre',
                alignItems: 'center',
                flexDirection: 'column'
            }}
            // className='bg-light'
            >
                <div style={{
                    width: '75%',
                    marginTop: 50,
                    marginBottom: 50,
                    display: 'flex',
                    flexDirection: 'row'
                }}>

                    <div>
                        <div className="mx-3" style={{}}>
                            <div style={{
                                width: 400,
                                // backgroundColor: '#80808020'
                            }}>
                                <Carousel useKeyboardArrows={false} showArrows={false} showStatus={false} showIndicators={false}>
                                    {location.state.url.map((URL, index) => (
                                        <div key={index} className="slide" >
                                            {/* <img
                                                key={index}
                                                src={URL}
                                                className="d-inline-block"
                                                alt="cart"
                                            /> */}
                                            <Container
                                                ref={containerRef}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                onMouseMove={handleMouseMove}
                                            >
                                                <Image ref={sourceRef} alt="cart_image" source={URL.link} />
                                                <Target
                                                    ref={targetRef}
                                                    alt="target"
                                                    opacity={opacity}
                                                    offset={offset}
                                                    source={URL.link}
                                                />
                                            </Container>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        flex: 1,
                        marginLeft: 0,
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            // backgroundColor: '#80808020',
                            padding: 15,
                            paddingLeft: 20,
                            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                        }}>
                            <div style={{ fontSize: 26, }}>{location.state.name}</div>
                            <div style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>Category: {location.state.category}</div>

                            <div style={{ fontSize: 26, fontWeight: 'bold', marginTop: 12 }}>{currencyRate.sign}{(location.state.price / Number(currencyRate.rate)).toFixed(2)} <span style={{ fontSize: 15, fontWeight: 500 }}>{currencyRate.symbol}</span>
                            </div>

                            <div style={{ marginTop: 10 }}>
                                <div style={{ fontSize: 14, color: 'red' }}>
                                    {
                                        (location.state.soldOut) ?
                                            <div style={{ border: '1px solid red', width: 80, borderRadius: 12, textAlign: 'center' }}>Sold out</div>
                                            :
                                            null
                                    }
                                </div>
                            </div>

                            <div style={{ marginTop: 12 }}>
                                <div style={{ fontSize: 15, color: '#2D68C4' }}>
                                    <span style={{ fontSize: 13, opacity: 0.65 }}>Quantity Available:</span>
                                    <span style={{ fontWeight: 'bold' }}> {location.state.quantity}</span></div>
                            </div>

                            <div style={{ marginTop: 15 }}>
                                <div style={{ fontSize: 17 }}>Availale size(s) (select size)</div>
                                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
                                    {
                                        location.state.sizes.map((item, index) => {
                                            return <div key={index} style={{ width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10, fontSize: 14, border: '1px solid grey', padding: 5, cursor: 'pointer', color: isSelectedSize && selectedSize == item ? 'white' : 'grey', backgroundColor: isSelectedSize && selectedSize == item ? 'grey' : 'transparent', fontWeight: 'bold', borderRadius: 8 }}
                                                onClick={() => {
                                                    selectSize(item)
                                                }}
                                            >
                                                {item}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>

                            <div style={{ marginTop: 15 }}>
                                <div style={{ fontSize: 17 }}>Available color(s) (select color)</div>
                                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
                                    {
                                        location.state.colors.map((item, index) => {
                                            return <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10, fontSize: 14, border: '1px solid grey', padding: 5, cursor: 'pointer', color: isSelectedColor && selectedColor == item ? 'white' : 'grey', backgroundColor: isSelectedColor && selectedColor == item ? 'grey' : 'transparent', fontWeight: 'bold', borderRadius: 8 }}
                                                onClick={() => {
                                                    selectColor(item)
                                                }}
                                            >
                                                {item}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>

                            <div style={{ marginTop: 15 }}>
                                {
                                    (error) ?
                                        <div style={{ fontSize: 14, color: 'red' }}>*{errorMessage}</div>
                                        :
                                        null
                                }
                            </div>



                            <div style={{ width: '100%', margin: 'auto', marginTop: 50, marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div >
                                    <Button variant="outline-primary" size='md' className='w-100'
                                        onClick={() => {
                                            carted ? removeCart(location.state.id) : addCart()
                                        }}
                                    >
                                        {
                                            (hasAddedCart) ?
                                                <span>Remove from Cart</span>
                                                :
                                                <span>Add to Cart</span>

                                        }
                                    </Button>
                                </div>
                                <div className='mx-3'>
                                    <Button variant="dark" size='md' className='w-100'
                                        onClick={() => {
                                            wished ? removeWishList(location.state.id) : addWishList()
                                        }}
                                    >{
                                            (hasAddedWishList) ?
                                                <span>Remove from Wishlist</span>
                                                :
                                                <span>Add to Wishlist</span>
                                        }</Button>
                                </div>
                            </div>

                            <div style={{ marginTop: 50 }}>
                                <div style={{ fontSize: 17, fontWeight: 'bold' }}>Pomotions</div>
                                <div style={{ fontSize: 13, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <img
                                        width={15}
                                        height={15}
                                        src={circle}
                                        className="d-inline-block"
                                        alt="cart"
                                    />

                                    <div style={{ marginLeft: 10 }}>Call +2349126314092 to place your order!</div>
                                </div>

                                <div style={{ fontSize: 13, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <img
                                        width={15}
                                        height={15}
                                        src={circle}
                                        className="d-inline-block"
                                        alt="cart"
                                    />

                                    <div style={{ marginLeft: 10 }}>Message +2348156578943 on whatsapp to place your order!</div>
                                </div>

                                <div style={{ fontSize: 13, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <img
                                        width={15}
                                        height={15}
                                        src={circle}
                                        className="d-inline-block"
                                        alt="cart"
                                    />

                                    <div style={{ marginLeft: 10 }}>Contact us on davidcy360@gmail.com for more enquires!</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 30, paddingLeft: 15, }}>
                            <div style={{ fontSize: 17, fontWeight: 'bold' }}>product description</div>
                            <div style={{ fontSize: 18, marginTop: 10, marginBottom: 10 }}>{location.state.description}</div>
                        </div>

                    </div>

                </div>



                <div style={{ fontSize: 20, fontWeight: 'bold', marginTop: 0 }}>Related products</div>

                <div>
                    {
                        (relatedProducts.length === 0) ?
                            <div>No related products yet!</div>
                            :
                            <div>
                                <div className='mt-3 mb-2' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        relatedProducts.map((item, index) => {
                                            return <ProductCard key={index} product={{
                                                name: item.name, price: item.price, currency: item.currency, id: item.id, url: item.url, description: item.description, quantity: item.quantity, sizes: item.sizes, weight: item.weight, soldOut: item.soldOut, category: item.category, currencyRate: Number(currencyRate.rate), currencySymbol: currencyRate.symbol, currencySign: currencyRate.sign, colors: item.colors, urlLarge: item.urlLarge
                                            }} />
                                        })
                                    }

                                </div>

                                <div className='mt-2 mb-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button variant="outline-dark">
                                        {
                                            (isLoadingMoreProducts) ?
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
                                                    let newNumber = page + 1;
                                                    setpage(newNumber);
                                                }} >View More</span>
                                        }
                                    </Button>
                                </div>
                            </div>
                    }
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
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>

            <Footer />
        </>
    )
}

export default ProductDetails
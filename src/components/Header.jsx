import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import logo from '../images/symbolcy360.jpg'
import cart_icon from '../images/shopping-cart.png'
import user_icon from '../images/user.png'
import { CartContext } from '../App';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';


function Header() {

    const navigate = useNavigate();




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



    const [productCategories, setproductCategories] = useState([
        {
            name: 'Suits',
            stock: [
                {
                    name: 'Coats',
                    link: 'https',
                    tag: 'suits-coats'
                },
                {
                    name: 'Coporate/Business',
                    link: 'https',
                    tag: 'suits-corporate'
                },
                {
                    name: 'Dinner',
                    link: 'https',
                    tag: 'suits-dinner'
                },
                {
                    name: 'Graduation',
                    link: 'https',
                    tag: 'suits-graduation'
                },
                {
                    name: 'Party',
                    link: 'https',
                    tag: 'suits-party'
                },
                {
                    name: 'Prom',
                    link: 'https',
                    tag: 'suits-prom'
                },
                {
                    name: 'Wedding',
                    link: 'https',
                    tag: 'suits-wedding'
                },
                {
                    name: 'Groomsmen',
                    link: 'https',
                    tag: 'suits-groomsmen'
                },
            ]
        },
        {
            name: 'Natives',
            stock: [
                {
                    name: 'Agbada',
                    link: 'https',
                    tag: 'natives-agbada'
                },
                {
                    name: 'Aso Oke - Agbada',
                    link: 'https',
                    tag: 'natives-aso'
                },
                {
                    name: 'Dashiki',
                    link: 'https',
                    tag: 'natives-dashiki'
                },
                {
                    name: 'Kaftan',
                    link: 'https',
                    tag: 'natives-kaftan'
                },

            ]
        },
        {
            name: 'Shirts',
            stock: [
                {
                    name: 'Casual',
                    link: 'https',
                    tag: 'shirts-casual'
                },
                {
                    name: 'Dress',
                    link: 'https',
                    tag: 'shirts-dress'
                },
                {
                    name: 'Denim',
                    link: 'https',
                    tag: 'shirts-denim'
                },
                {
                    name: 'Evening Shirts',
                    link: 'https',
                    tag: 'shirts-evening-shirts'
                },
                {
                    name: 'Polo',
                    link: 'https',
                    tag: 'shirts-polo'
                },
                {
                    name: 'T-shirt & Sweatshirt',
                    link: 'https',
                    tag: 'shirts-tshirt'
                },
                {
                    name: 'Leather',
                    link: 'https',
                    tag: 'shirts-leather'
                },
            ]
        },
        {
            name: 'Pants',
            stock: [
                {
                    name: 'Ceremonial',
                    link: 'https',
                    tag: 'pants-ceremonial'
                },
                {
                    name: 'Combat',
                    link: 'https',
                    tag: 'pants-combat'
                },
                {
                    name: 'Draw String',
                    link: 'https',
                    tag: 'pants-drawstring'
                },
                {
                    name: 'Denim',
                    link: 'https',
                    tag: 'pants-denim'
                },
                {
                    name: 'Gurkha',
                    link: 'https',
                    tag: 'pants-gurkha'
                },
                {
                    name: 'Joggers',
                    link: 'https',
                    tag: 'pants-joggers'
                },
                {
                    name: 'Tuxedo',
                    link: 'https',
                    tag: 'pants-tuxedo'
                },
            ]
        },
        {
            name: 'Caps',
            stock: [
                {
                    name: 'African',
                    link: 'https',
                    tag: 'caps-african'
                },
                {
                    name: 'Western',
                    link: 'https',
                    tag: 'caps-western'
                },
                {
                    name: 'Baret',
                    link: 'https',
                    tag: 'caps-baret'
                },
                {
                    name: 'Fedora',
                    link: 'https',
                    tag: 'caps-fedora'
                },
            ]
        },
    ])

    const [currentCurrency, setcurrentCurrency] = useState({})


    const [data, setData] = useState(undefined);

    useEffect(() => {
        let currentCurrentObj = localStorage.getItem('currentCurrencyRates');
        currentCurrentObj = JSON.parse(currentCurrentObj);
    }, [])



    const options = [
        "USD",
        "GBP",
        "EUR",
        "YEN",
        "NGN",
    ];


    const onOptionChangeHandler = (event) => {
        setData(event.target.value);

        currencyArray.map((item, index) => {
            // return console.log(item, event.target.value)
            if (item.symbol === event.target.value) {
                setcurrencyRate(item);
                updateCurrentCurrency(item);

                setcurrencyArray(currencyArray)
                updateCurrencyArray(currencyArray)
            }
        })
    };






    return (
        <Navbar sticky="top" bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="davidcy360 logo"
                        style={{ borderRadius: 50 }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link href="/faqs">FAQs</Nav.Link>
                        <Nav.Link href="/user/wish-list">Wishlist</Nav.Link>

                        {
                            productCategories.map((item, index) => {
                                return <NavDropdown key={index} title={item.name} id="collapsible-nav-dropdown">
                                    {
                                        item.stock.map((item, i) => {
                                            return <NavDropdown.Item key={i} href={`/product-category/${item.tag}`}>
                                                {item.name}
                                            </NavDropdown.Item>
                                        })
                                    }
                                </NavDropdown>
                            })
                        }


                    </Nav>

                    <Nav>
                        <select onChange={onOptionChangeHandler} value={currencyRate.symbol} style={{ border: 0, outline: 0, backgroundColor: '#0000095' }}>
                            {options.map((option, index) => {
                                return (
                                    <option key={index}
                                    >
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                        <Nav.Link href="/cart">
                            <img
                                src={cart_icon}
                                width="30"
                                height="30"
                                className="d-inline-block align-top mx-2"
                                alt="cart"
                            />
                            <Badge pill bg="light" text="dark">
                                {userCart.length}
                            </Badge>
                        </Nav.Link>
                        <Nav.Link href="/profile">
                            <img
                                src={user_icon}
                                width="30"
                                height="30"
                                className="d-inline-block align-top mx-2"
                                alt="user"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
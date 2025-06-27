import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import bg1 from '../images/bg-1.jpg';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../App';
import loader from '../images/loader3.gif';

function Home() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

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



    const [hotProducts, sethotProducts] = useState([])

    let windowHeight = window.innerHeight;

    const [navheight, setNavheight] = useState(76);
    // const ref = useRef(null)

    // useEffect(() => {
    //     setNavheight(ref.current.clientHeight);
    //     console.log(ref.current.clientHeight)
    // }, [])

    const [isLoaingMoreProducts, setisLoaingMoreProducts] = useState(false)


    const [carouselData, setcarouselData] = useState([])


    const [aboutUs, setaboutUs] = useState('');
    const [currencyRatesArrray, setcurrencyRatesArrray] = useState([])

    const [currentCurrency, setcurrentCurrency] = useState({});

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

            //about us data and home images
            setaboutUs(data.data[0].aboutUs);
            setcarouselData(data.data[0].images)
        }

    }


    useEffect(() => {
        getSettings()
    }, [currentCurrency])


    const [page, setpage] = useState(1);



    const getProducts = async () => {

        setisLoaingMoreProducts(true);

        const res = await fetch(`${base_url}/davidcy360/all-products?limit=6&page=${page}`, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })

        const data = await res.json();

        if (data.loaded) {
            setisLoaingMoreProducts(false)
            let newArray = [...hotProducts, ...data.data]

            sethotProducts(newArray);
        } else {
            setisLoaingMoreProducts(false)
        }
    }



    useEffect(() => {

        getProducts()

    }, [page])








    return (
        <>
            <Header />



            {/* body courosel  */}
            <Carousel>
                {
                    carouselData.map((item, index) => {
                        return <Carousel.Item key={index} interval={1000}>
                            {/* image  */}
                            <img
                                src={item.url}
                                width="100%"
                                height={windowHeight - navheight}
                                className="d-inline-block"
                                alt="cart"
                            />
                            <Carousel.Caption style={{
                                // position: 'absolute',
                                // left: '50%',
                                // top: '50%',
                                // transform: 'translate(-40%, -40%)'
                            }}>
                                <h2>{item.title}</h2>
                                <h4>
                                    {item.subTitle}
                                </h4>
                                {/* <Button variant="info">Shop Now</Button> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                    })
                }
            </Carousel>

            {/* hot products  */}
            <div className='container-fluid py-3 bg-light'>
                <div className='my-2 mt-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Hot Products</h2>
                </div>

                <div className='my-4' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>

                    {
                        hotProducts.map((item, index) => {
                            return <ProductCard key={index} product={{
                                name: item.name, price: item.price, currency: item.currency, id: item.id, url: item.url, description: item.description, quantity: item.quantity, sizes: item.sizes, weight: item.weight, soldOut: item.soldOut, category: item.category, currencyRate: Number(currencyRate.rate), currencySymbol: currencyRate.symbol, currencySign: currencyRate.sign, colors: item.colors, urlLarge: item.urlLarge
                            }} />
                        })
                    }
                </div>

                <div className='my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="dark">
                        {
                            (isLoaingMoreProducts) ?
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


            {/* about us  */}
            <div className='container-fluid py-5 px-5 '>
                <div className='my-2 mt-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>About Us</h2>
                </div>

                <p className='pt-3 pb-5 px-5' style={{ margin: 'auto', lineHeight: 2.5, width: '80%' }} >
                    {aboutUs}
                </p>
            </div>

            {/* footer  */}
            <Footer />

        </>
    )
}

export default Home
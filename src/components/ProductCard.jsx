import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import bg1 from '../images/bg-1.jpg';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';


function ProductCard({ product }) {

    const navigate = useNavigate();

    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;


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


    const carted = isCart(product.id);
    const wished = isWishList(product.id);

    // console.log(product.currencyRate)


    return (
        <Card className='mx-2 mt-3 px-2' style={{ width: '14rem', cursor: 'pointer', border: 0, borderRadius: 12 }}
            onClick={() => {
                navigate(`/product/${product.name}`, {
                    state: {
                        id: product.id, name: product.name, description: product.description, price: product.price, currency: product.currency, quantity: product.quantity, url: product.url, sizes: product.sizes, weight: product.weight, soldOut: product.soldOut, category: product.category, colors: product.colors, urlLarge: product.urlLarge
                    }
                })
            }}
        >
            <img
                src={product.url[0].link}
                width="100%"
                height="220"
                className="d-inline-block"
                alt="cart"
                style={{ borderRadius: 12 }}
            />
            <Card.Body>

                <Card.Title style={{
                    fontSize: 14, overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {product.name}
                </Card.Title>

                <Card.Text style={{ fontSize: 15 }}>{currencyRate.sign}{(product.price / Number(currencyRate.rate)).toFixed(2)} <span style={{ fontSize: 14, fontWeight: 500 }}>{currencyRate.symbol}</span></Card.Text>
                {/* <Button variant="outline-dark" size='sm' className='w-100'
                    onClick={() => {
                        carted ? null : addToUserCart(product);
                    }}
                >Add to Cart</Button>
                <Button variant="secondary" size='sm' className='w-100 mt-2'
                    onClick={() => {
                        wished ? null : addToUserWishList(product);
                    }}
                >Add to Wishlist</Button> */}
            </Card.Body>
        </Card>
    )
}

export default ProductCard
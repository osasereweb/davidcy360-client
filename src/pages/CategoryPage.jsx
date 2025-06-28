import React, { useContext, useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import bg1 from '../images/bg-1.jpg';
import loader from '../images/loader3.gif';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Dropdown from 'react-bootstrap/Dropdown';



function CategoryPage() {

    let base_url = `https://davidcy360-server.onrender.com`;

    const navigate = useNavigate();

    const [gifLoading, setgifLoading] = useState(false);
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const [filteredProducts, setfilteredProducts] = useState([]);
    const [stableFilteredProducts, setstableFilteredProducts] = useState([])

    const [isLoadingMoreProducts, setisLoadingMoreProducts] = useState(false);

    const { category } = useParams()



    const [page, setpage] = useState(1);

    const [searchTerm, setsearchTerm] = useState('');

    const [prevSearchTerm, setprevSearchTerm] = useState('')

    const [searchByName, setsearchByName] = useState(false);
    const [sortLatest, setsortLatest] = useState(false);
    const [sortL, setsortL] = useState(false);
    const [sortH, setsortH] = useState(false);



    const getProducts = async () => {

        setisLoadingMoreProducts(true);

        ///conditional url
        let url = `${base_url}/davidcy360/all-products/category?limit=12&page=${page}&category=${category}`;



        const res = await fetch(url, {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },

        })

        const data = await res.json();

        // console.log(data)

        if (data.loaded) {
            setisLoadingMoreProducts(false)
            let newArray = [...filteredProducts, ...data.data];

            // newArray = newArray.slice().reverse()


            // let filterArray = []

            // if (sortL) filterArray = filterByLow(newArray);
            // if (sortH) filterArray = filterByHigh(newArray);
            // filterArray = newArray

            setfilteredProducts(newArray);
            setstableFilteredProducts(newArray);
        } else {
            setisLoadingMoreProducts(false)
        }

    }


    const handlescroll = () => {
        if ((window.innerHeight + document.documentElement.scrollTop + 1) >= (document.documentElement.scrollHeight) - 480) {
            setisLoadingMoreProducts(true);
            let newNumber = page + 1;
            setpage(newNumber);
        }
    }


    useEffect(() => {
        window.addEventListener("scroll", handlescroll);

        return () => window.removeEventListener("scroll", handlescroll);
    }, [])




    useEffect(() => {

        getProducts()


    }, [, page])





    return (
        <>

            <Header />

            <div className='container-fluid pt-4 pb-5 px-3 bg-light'>
                <div className='my-2 mx-5' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div style={{ color: 'grey', fontWeight: 'bold', fontSize: 18, fontFamily: 'serif' }}>category: {category}</div>
                </div>

                {
                    (stableFilteredProducts.length === 0) ?
                        <div style={{ marginTop: 80, marginBottom: 150, textAlign: 'center', fontSize: 22 }}>No product in this category has been added yet!</div>
                        :
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '35%' }}>
                                    <input
                                        name="searchTerm"
                                        placeholder='Search product by name'
                                        type='text'
                                        value={searchTerm}
                                        style={{ border: 0, outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: '100%', borderRadius: 6, padding: 8 }}
                                        onChange={e => {
                                            setsearchTerm(e.target.value)
                                        }}
                                    />
                                </div>

                                <div className='mx-2'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Sort by option
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item active={(!sortL && !sortH) ? true : false} onClick={() => {
                                                setsortL(false)
                                                setsortH(false)
                                            }}>Sort by latest</Dropdown.Item>

                                            <Dropdown.Item active={(sortL) ? true : false} onClick={(e) => {
                                                setsortL(true)
                                                setsortH(false)

                                            }}>sort by price: Low to high</Dropdown.Item>

                                            <Dropdown.Item active={(sortH) ? true : false} onClick={() => {
                                                setsortL(false)
                                                setsortH(true)
                                            }}>sort by price: High to low</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='my-4' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>

                                {
                                    filteredProducts
                                        .sort((a, b) => {
                                            if (sortL) return Number(a.price) - Number(b.price)
                                            if (sortH) return Number(b.price) - Number(a.price);
                                        })
                                        .filter((item) => {
                                            return searchTerm.toLowerCase() === ''
                                                ? item
                                                : item.name.toLowerCase().includes(searchTerm)
                                        })
                                        .map((item, index) => {
                                            return <ProductCard key={index} product={{
                                                name: item.name, price: item.price, currency: item.currency, id: item.id, url: item.url, description: item.description, quantity: item.quantity, sizes: item.sizes, weight: item.weight, soldOut: item.soldOut, category: item.category, colors: item.colors, urlLarge: item.urlLarge
                                            }} />
                                        })
                                }
                            </div>

                            <div className='my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                        null
                                }
                                {/* <Button variant="dark">
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
                                </Button> */}
                            </div>
                        </div>
                }
            </div >

            <Footer />


        </>
    )
}

export default CategoryPage
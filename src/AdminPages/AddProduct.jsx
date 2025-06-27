import React, { useContext, useEffect, useRef, useState } from 'react'
import Footer from '../components/footer';
import Header from '../components/Header';
import bg1 from '../images/bg-1.jpg';
import deleteIcon from '../images/trash.png';
import { CartContext } from '../App';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import loader from '../images/loader3.gif';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import check_logo from '../images/check-verified.png';




function AddProduct() {

    let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);


    const [productName, setproductName] = useState('');
    const [productDescription, setproductDescription] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productQuantity, setproductQuantity] = useState('');
    const [productWeight, setproductWeight] = useState('');

    const [selectedCategory, setselectedCategory] = useState('');

    const [colorInput, setcolorInput] = useState('')
    const [colors, setcolors] = useState([]);
    const [isColorError, setisColorError] = useState(false)



    const [option, setoption] = useState([
        {
            value: 'Suits-coats',
            label: 'Suits-coats'
        },
        {
            value: 'Suits-corporate',
            label: 'Suits-corporate'
        },
        {
            value: 'Suits-dinner',
            label: 'Suits-dinner'
        },

        {
            value: 'Suits-graduation',
            label: 'Suits-graduation'
        },
        {
            value: 'Suits-party',
            label: 'Suits-party'
        },
        {
            value: 'Suits-prom',
            label: 'Suits-prom'
        },
        {
            value: 'Suits-wedding',
            label: 'Suits-wedding'
        },
        {
            value: 'Suits-groomsmen',
            label: 'Suits-groomsmen'
        },


        {
            value: 'Natives-agbada',
            label: 'Natives-agbada'
        },
        {
            value: 'Natives-aso',
            label: 'Natives-aso'
        },
        {
            value: 'Natives-dashiki',
            label: 'Natives-dashiki'
        },
        {
            value: 'Natives-kaftan',
            label: 'Natives-kaftan'
        },


        {
            value: 'Shirts-casual',
            label: 'Shirts-casual'
        },
        {
            value: 'Shirts-casual',
            label: 'Shirts-casual'
        },
        {
            value: 'Shirts-denim',
            label: 'Shirts-denim'
        },
        {
            value: 'Shirts-evening-shirts',
            label: 'Shirts-evening-shirts'
        },
        {
            value: 'Shirts-polo',
            label: 'Shirts-polo'
        },
        {
            value: 'Shirts-tshirt',
            label: 'Shirts-tshirt'
        },
        {
            value: 'Shirts-leather',
            label: 'Shirts-leather'
        },



        {
            value: 'Pants-ceremonial',
            label: 'Pants-ceremonial'
        },
        {
            value: 'Pants-combat',
            label: 'Pants-combat'
        },
        {
            value: 'Pants-draw-string',
            label: 'Pants-draw-string'
        },
        {
            value: 'Pants-denim',
            label: 'Pants-denim'
        },
        {
            value: 'Pants-gurkha',
            label: 'Pants-gurkha'
        },
        {
            value: 'Pants-tuxedo',
            label: 'Pants-tuxedo'
        },
        {
            value: 'Pants-joggers',
            label: 'Pants-joggers'
        },



        {
            value: 'Caps-african',
            label: 'Caps-african'
        },
        {
            value: 'Caps-western',
            label: 'Caps-western'
        },
        {
            value: 'Caps-baret',
            label: 'Caps-baret'
        },
        {
            value: 'Caps-fedora',
            label: 'Caps-fedora'
        },

    ])



    const [isCheckedXS, setisCheckedXS] = useState(false);
    const [isCheckedS, setisCheckedS] = useState(false)
    const [isCheckedM, setisCheckedM] = useState(false);
    const [isCheckedL, setisCheckedL] = useState(false)
    const [isCheckedXL, setisCheckedXL] = useState(false);
    const [isChecked2L, setisChecked2L] = useState(false);
    const [isChecked3L, setisChecked3L] = useState(false);
    const [isChecked4L, setisChecked4L] = useState(false);
    const [isChecked5L, setisChecked5L] = useState(false);
    const [isChecked6L, setisChecked6L] = useState(false);



    const handleChangeXS = () => {
        setisCheckedXS(!isCheckedXS);
    };

    const handleChangeS = () => {
        setisCheckedS(!isCheckedS);
    };

    const handleChangeM = () => {
        setisCheckedM(!isCheckedM);
    };

    const handleChangeL = () => {
        setisCheckedL(!isCheckedL);
    };

    const handleChangeXL = () => {
        setisCheckedXL(!isCheckedXL);
    };

    const handleChange2L = () => {
        setisChecked2L(!isChecked2L);
    };

    const handleChange3L = () => {
        setisChecked3L(!isChecked3L);
    };

    const handleChange4L = () => {
        setisChecked4L(!isChecked4L);
    };

    const handleChange5L = () => {
        setisChecked5L(!isChecked5L);
    };

    const handleChange6L = () => {
        setisChecked6L(!isChecked6L);
    };




    const [imagePreview, setimagePreview] = useState([]);

    const handFilleUpload = (e) => {
        const file = e.target.files[0];

        let reader = new FileReader();

        reader.onloadend = function () {
            setimagePreview([...imagePreview, reader.result]);
        }
        reader.readAsDataURL(file)
    }


    const deleteImage = (image) => {

        let newImageArray = [];

        imagePreview.map((item, index) => {
            if (item !== image) {
                newImageArray.push(item);
            }
        })

        setimagePreview(newImageArray);
    }



    const [isError, setisError] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');
    const [isGifLoading, setisGifLoading] = useState(false);


    const launchProduct = async () => {


        let selectedSizes = [];

        if (isCheckedXS) selectedSizes.push('XS');
        if (isCheckedS) selectedSizes.push('S');
        if (isCheckedM) selectedSizes.push('M');
        if (isCheckedL) selectedSizes.push('L');
        if (isCheckedXL) selectedSizes.push('XL');
        if (isChecked2L) selectedSizes.push('2L');
        if (isChecked3L) selectedSizes.push('3L');
        if (isChecked4L) selectedSizes.push('4L');
        if (isChecked5L) selectedSizes.push('5L');
        if (isChecked6L) selectedSizes.push('6L');



        if ((productName == '' || productDescription == '' || productPrice == '' || productQuantity == '' || productWeight == '' || selectedCategory == '' || imagePreview.length == 0)
            ||
            (isCheckedXS == false && isCheckedS == false && isCheckedM == false && isCheckedL == false && isCheckedXL == false && isChecked2L == false && isChecked3L == false && isChecked4L == false && isChecked5L == false && isChecked6L == false)) {
            seterrorMessage('*Fill all required field to post a product!')
            return setisError(true);
        }


        if (colors.length === 0) {
            seterrorMessage('*Add available colors of products!')
            return setisError(true);
        }

        let productData = {
            productName,
            productDescription,
            productPrice,
            productQuantity,
            productWeight,
            colors,
            availableSizes: selectedSizes,
            selectedCategory: selectedCategory,
            imageArray: imagePreview,
        }

        // console.log(productData);

        setisGifLoading(true);
        setisError(false);
        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/post-product`, {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(productData)
        })

        const data = await res.json();

        if (data.productPosted) {
            setisGifLoading(false);
            setShowA(true);
        } else {
            setisGifLoading(false);
            seterrorMessage('Could not post product at this time!');
            return setisError(true);
        }

    }


    const logoutAdmin = async () => {

        const res = await fetch(`${base_url}/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/logout`, {
            method: 'POST',
            withCredntials: true,
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            }
        })

        if (res.ok) window.location.reload();

    }





    return (
        <>


            <div>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 py-2 shadow">
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
                        DavidCy360
                    </a>
                    <button
                        className="navbar-toggler position-absolute d-md-none collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a className="nav-link px-3" onClick={logoutAdmin}>
                                Sign out
                            </a>
                        </div>
                    </div>
                </header>



                <div className="container-fluid">
                    <div className="row">
                        <nav
                            id="sidebarMenu"
                            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
                        >
                            <div className="position-sticky pt-3">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-orders">
                                            <span data-feather="file" />
                                            Orders
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: 'black', fontWeight: 'bold' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/add-product">
                                            <span data-feather="shopping-cart" />
                                            Add Products
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products">
                                            <span data-feather="shopping-cart" />
                                            All Products
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-customers">
                                            <span data-feather="users" />
                                            Customers
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/settings">
                                            <span data-feather="users" />
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                    <span>Saved reports</span>
                                    <a className="link-secondary" href="#" aria-label="Add a new report">
                                        <span data-feather="plus-circle" />
                                    </a>
                                </h6>
                                <ul className="nav flex-column mb-2">
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/sales">
                                            <span data-feather="file-text" />
                                            Sales
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: 'black' }} href="/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/currency-rates">
                                            <span data-feather="file-text" />
                                            Currency Rates
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Admin Dashboard</h1>
                            </div>
                            <h4>Add Product</h4>
                            <div>
                                <div style={{ marginTop: 12 }}>
                                    <div>Product Name: </div>
                                    <textarea name="productName" rows={3} cols={50}
                                        value={productName}
                                        onChange={e => {
                                            setproductName(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Product Description: </div>
                                    <textarea name="productDescription" rows={4} cols={50}
                                        value={productDescription}
                                        onChange={e => {
                                            setproductDescription(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Enter price (₦): </div>
                                    <input
                                        name="pice"
                                        placeholder='Enter price (₦)'
                                        type='Number'
                                        value={productPrice}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 130, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setproductPrice(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Quantity: </div>
                                    <input
                                        name="quatity"
                                        placeholder='Enter product quantity'
                                        type='Number'
                                        value={productQuantity}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 180, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setproductQuantity(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Weight (kg): </div>
                                    <input
                                        name="weight"
                                        placeholder='Enter product weight (kg)'
                                        type='Number'
                                        value={productWeight}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 205, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setproductWeight(e.target.value)
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: 18 }}>
                                    <div>Select Available Sizes: </div>

                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedXS}
                                                    onChange={handleChangeXS}
                                                />
                                                XS
                                            </label>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedS}
                                                    onChange={handleChangeS}
                                                />
                                                S
                                            </label>
                                        </div>

                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedM}
                                                    onChange={handleChangeM}
                                                />
                                                M
                                            </label>
                                        </div>

                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedL}
                                                    onChange={handleChangeL}
                                                />
                                                L
                                            </label>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isCheckedXL}
                                                    onChange={handleChangeXL}
                                                />
                                                XL
                                            </label>
                                        </div>

                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked2L}
                                                    onChange={handleChange2L}
                                                />
                                                2L
                                            </label>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked3L}
                                                    onChange={handleChange3L}
                                                />
                                                3L
                                            </label>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked4L}
                                                    onChange={handleChange4L}
                                                />
                                                4L
                                            </label>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked5L}
                                                    onChange={handleChange5L}
                                                />
                                                5L
                                            </label>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked6L}
                                                    onChange={handleChange6L}
                                                />
                                                6L
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div style={{ marginTop: 18 }}>
                                    <div>Add available colors: </div>
                                    <input
                                        name="weight"
                                        placeholder='Add product color'
                                        type='text'
                                        value={colorInput}
                                        style={{ border: '1px solid grey', outlineColor: '#0096c7', borderWidth: 0.5, borderColor: 'gray', width: 205, borderRadius: 6, marginTop: 5, padding: 3 }}
                                        onChange={e => {
                                            setcolorInput(e.target.value)
                                        }}
                                    />

                                    <div style={{ marginTop: 10 }}>
                                        {
                                            (colors.length === 0) ?
                                                null
                                                :
                                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    {
                                                        colors.map((item, index) => {
                                                            return <div key={index}>
                                                                <div className='mx-3' style={{ fontWeight: 'bold' }}>{item.toUpperCase()}</div>
                                                                <div className='mx-3' style={{ marginTop: 5 }}>
                                                                    <Button variant="outline-danger" size='sm' className='mt-2 mb-2'
                                                                        onClick={() => {
                                                                            let filterArray = [];
                                                                            colors.map((color, index) => {
                                                                                if (item !== color) {
                                                                                    filterArray.push(item.toUpperCase())
                                                                                }
                                                                            })
                                                                            setcolors(filterArray);
                                                                        }}
                                                                    >
                                                                        Remove color
                                                                    </Button>

                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>

                                        }
                                    </div>

                                    <div style={{ marginTop: 10, color: 'red', fontSize: 12 }}>
                                        {
                                            (isColorError) ?
                                                <span>{errorMessage}</span>
                                                :
                                                null
                                        }
                                    </div>

                                    <Button variant="info" size='md' className='mt-3 mb-2'
                                        onClick={() => {
                                            if (colorInput === '') {
                                                seterrorMessage('*Please input color to add')
                                                return setisColorError(true)
                                            }

                                            let alreadyAdded = false;

                                            colors.map((item, index) => {
                                                if (item == colorInput) {
                                                    alreadyAdded = true;
                                                    seterrorMessage('*This color has already been added!')
                                                    return setisColorError(true);
                                                }
                                            })

                                            if (!alreadyAdded) {
                                                setisColorError(false)
                                                let newColorsArray = [...colors, colorInput]
                                                setcolors(newColorsArray);
                                            }
                                        }}
                                    >
                                        Add color
                                    </Button>
                                </div>


                                <div style={{ marginTop: 18, width: 250 }}>
                                    <div style={{ marginBottom: 6 }}>Category:</div>
                                    <Select options={option} value={selectedCategory} onChange={(value) => { setselectedCategory(value) }} />
                                </div>

                                <div style={{ marginTop: 18, width: 250, marginBottom: 50 }}>
                                    <div style={{ marginBottom: 10 }}>Product Images:</div>
                                    <input type="file" name="productImages" id="productImage" onChange={handFilleUpload} />
                                </div>

                                <div style={{ marginTop: 6, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                                    {
                                        imagePreview.map((item, index) => {
                                            return <div key={index} style={{ width: 180, height: 180, marginRight: 12, position: 'relative', backgroundColor: 'grey', marginTop: 12 }}>
                                                <img width={'100%'} height={'100%'} src={item} alt="preview" />
                                                <div style={{ backgroundColor: 'white', borderRadius: 50, width: 30, height: 30, cursor: 'pointer', position: 'absolute', top: 5, right: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                    onClick={() => {
                                                        deleteImage(item)
                                                    }}
                                                >
                                                    <img width={20} height={20} src={deleteIcon} alt="remove" style={{}} />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>

                                <div style={{ marginTop: 10, marginBottom: 10, fontSize: 12, color: 'red' }}>
                                    {
                                        (isError) ?
                                            <div>{errorMessage}</div>
                                            :
                                            null
                                    }
                                </div>

                                <div style={{ marginTop: 15, marginBottom: 20 }}>
                                    <Button variant="primary" size='lg' className='mt-3 mb-2' >
                                        {
                                            (isGifLoading) ?
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
                                                    //launch product
                                                    launchProduct()
                                                }} >Launch product</span>
                                        }
                                    </Button>
                                </div>


                            </div>
                        </main>

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
                                <Toast.Body>Product uploaded successfully!</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </div>
                </div>

            </div>


        </>
    )
}

export default AddProduct
import { useState, createContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './AdminPages/Admin';
import Profile from './pages/Profile';
import Overview from './pages/Overview';
import Delivery from './pages/Delivery';
import Returns from './pages/Returns';
import Faqs from './pages/Faqs';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import AddAddress from './pages/AddAddress';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Payment from './pages/Payment';
import ViewOrder from './pages/ViewOrder';
import PackageDetails from './AdminPages/PackageDetails';
import ViewAllAddress from './pages/ViewAllAddress';
import AddProduct from './AdminPages/AddProduct';
import AllProducts from './AdminPages/AllProducts';
import AdminProductDetails from './AdminPages/AdminProductDetails';
import AllCustomers from './AdminPages/AllCustomers';
import Settings from './AdminPages/Settings';
import ViewCustomers from './AdminPages/ViewCustomers';
import PerfectFitGuide from './pages/PerfectFitGuide';
import Sales from './AdminPages/Sales';
import AdminLogin from './AdminPages/AdminLogin';
import CurrencyRates from './AdminPages/CurrencyRates';
import WishLists from './pages/WishLists';
import CategoryPage from './pages/CategoryPage';


export const CartContext = createContext();


function App() {

  let base_url = import.meta.env.SERVER_URL || 'http://localhost:3000';

  const [userCart, setuserCart] = useState([]);
  const [userWishList, setuserWishList] = useState([]);

  const [userGeneralEmailState, setuserGeneralEmailState] = useState('');

  const [currencyRate, setcurrencyRate] = useState({});
  const [currencyArray, setcurrencyArray] = useState([]);



  const getCurrencyData = async () => {

    const storedCurrencyArray = localStorage.getItem("storedCurrencyArray");
    const storedCurrentCurrency = localStorage.getItem("storedCurrentCurrency");


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
      if (storedCurrencyArray === null) {
        localStorage.setItem("storedCurrencyArray", JSON.stringify(data.data[0].currencyRates));
      }
      if (storedCurrentCurrency === null) {
        localStorage.setItem("storedCurrentCurrency", JSON.stringify(data.data[0].currencyRates[1]));
      }

      data.data[0].currencyRates.map((item, index) => {
        if (item.rate !== currencyArray[index]) {
          setcurrencyArray(data.data[0].currencyRates)
        }
      })

    } else {
      window.alert('Can not load data at this time!')
    }
  }


  useEffect(() => {
    currencyArray.map((item, index) => {
      if (item.symbol === currencyRate.symbol) {
        if (item.rate !== currencyRate.rate) {
          setcurrencyRate(item);
        }
      }
    })
  }, [currencyArray])






  useEffect(() => {

    const storedUserCart = localStorage.getItem("storedUserCart");
    const storedUserWishList = localStorage.getItem("storedUserWishList");


    let emptyArray = [];
    let emptyArray2 = [];

    // let emptyArray3 = []
    // let emptyObj = {}

    if (storedUserCart === null) {
      localStorage.setItem("storedUserCart", JSON.stringify(emptyArray));
    }
    if (storedUserWishList === null) {
      localStorage.setItem("storedUserWishList", JSON.stringify(emptyArray2));
    }


    getCurrencyData()



  }, [])


  useEffect(() => {
    const storedUserCart = localStorage.getItem("storedUserCart");
    const storedUserWishList = localStorage.getItem("storedUserWishList");

    if (userCart !== null) setuserCart(JSON.parse(storedUserCart));
    if (userWishList !== null) setuserWishList(JSON.parse(storedUserWishList));


    //for currency
    const storedCurrencyArray = localStorage.getItem("storedCurrencyArray");
    const storedCurrentCurrency = localStorage.getItem("storedCurrentCurrency");

    if (storedCurrencyArray !== null) setcurrencyArray(JSON.parse(storedCurrencyArray));
    if (storedCurrentCurrency !== null) setcurrencyRate(JSON.parse(storedCurrentCurrency))

  }, [])


  //store new currencies array
  const updateCurrencyArray = (array) => {
    setcurrencyArray(array);
    localStorage.setItem("storedCurrencyArray", JSON.stringify(array));
  }


  //store new currency object
  const updateCurrentCurrency = (currentObj) => {
    setcurrencyRate(currentObj);
    localStorage.setItem("storedCurrentCurrency", JSON.stringify(currentObj));
  }


  const addToUserCart = (product) => {
    setuserCart(prev => [...prev, product]);
    let newCart = [...userCart, product];
    localStorage.setItem("storedUserCart", JSON.stringify(newCart));
  }

  //wish list
  const addToUserWishList = (product) => {
    setuserWishList(prev => [...prev, product]);
    let newWishList = [...userWishList, product];
    localStorage.setItem("storedUserWishList", JSON.stringify(newWishList));
  }



  //add to cart
  const removeFromUserCart = (productId) => {

    setuserCart(prev => prev.filter(product => {
      product.id !== productId
    }));

    let emptyArray = [];

    userCart.map((item, index) => {
      if (item.id !== productId) {
        emptyArray.push((item));
      }
    })

    setuserCart(emptyArray);
    localStorage.setItem("storedUserCart", JSON.stringify(emptyArray));
  }


  //wish list
  const removeFromUserWishList = (productId) => {
    // setuserWishList(prev => prev.filter(product => product.id !== productId));
    // localStorage.setItem("storedUserWishList", JSON.stringify(userWishList));

    setuserWishList(prev => prev.filter(product => {
      product.id !== productId
    }));

    let emptyArray = [];

    userWishList.map((item, index) => {
      if (item.id !== productId) {
        emptyArray.push((item));
      }
    })

    setuserWishList(emptyArray);
    localStorage.setItem("storedUserWishList", JSON.stringify(emptyArray));
  }



  const isCart = (productId) => {
    return userCart.some(product => product.id === productId)
  }


  const isWishList = (productId) => {
    return userWishList.some(product => product.id === productId)
  }




  return (
    <CartContext.Provider
      value={[
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
      ]}
    >
      <>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/login'
            element={<AdminLogin />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-orders'
            element={<Admin />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/package-details'
            element={<PackageDetails />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/add-product'
            element={<AddProduct />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products'
            element={<AllProducts />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-products/:id'
            element={<AdminProductDetails />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-customers'
            element={<AllCustomers />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/all-customers/customer'
            element={<ViewCustomers />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/settings'
            element={<Settings />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/sales'
            element={<Sales />}
          />

          <Route
            path='/v1/O19VvUGFTDS5sxIlLmMnhytTredfshJJDG0Oogyw/Admin/currency-rates'
            element={<CurrencyRates />}
          />

          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/signup'
            element={<Signup />}
          />

          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/overview'
            element={<Overview />}
          />

          <Route
            path='/delivery-time-cost'
            element={<Delivery />}
          />

          <Route
            path='/returns-refunds'
            element={<Returns />}
          />

          <Route
            path='/perfect-fit-guide'
            element={<PerfectFitGuide />}
          />

          <Route
            path='/faqs'
            element={<Faqs />}
          />

          <Route
            path='/profile/edit-profile'
            element={<EditProfile />}
          />

          <Route
            path='/profile/change-password'
            element={<ChangePassword />}
          />

          <Route
            path='/profile/add-address'
            element={<AddAddress />}
          />
          <Route
            path='/product/:id'
            element={<ProductDetails />}
          />
          <Route
            path='/cart'
            element={<CartPage />}
          />
          <Route
            path='/cart/payment'
            element={<Payment />}
          />

          <Route
            path='/profile/order'
            element={<ViewOrder />}
          />

          <Route
            path='/profile/all-address'
            element={<ViewAllAddress />}
          />

          <Route
            path='/user/wish-list'
            element={<WishLists />}
          />

          <Route
            path='/product-category/:category'
            element={<CategoryPage />}
          />




        </Routes>

      </>
    </CartContext.Provider>

  )
}

export default App

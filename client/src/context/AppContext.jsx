import { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";  
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartitems, setCartitems] = useState({});
  const [searchQuery, setSearchQuery] = useState({})

  // Fetch Seller Status 

  const fetchSeller = async () =>{
    try {
      const {data} = await axios.get('/api/seller/is-auth');
      if (data.success) {
        setIsSeller(true)
      }else{
        setIsSeller(false)
      }
    } catch (error) {
        setIsSeller(false)
    }
  }


  // Fetch User Auth Status,User Data and Cart Items
  
  const fetchUser = async () =>{
    try {
      const {data} = await axios.get('/api/user/is-auth')
      if (data.success) {
        setUser(data.user);
        setCartitems(data.user.cartItems || {})
      }
    } catch (error) {
      setUser(null)
    }
  }


  //Fetch all products
  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product/list')
      if (data.success) {
        setProducts(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  };

  // Add product to cart
  const addtocart = (itemId) => {
  let cartData = structuredClone(cartitems || {});

  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  setCartitems(cartData);
  toast.success("Added to Cart");
};

  //Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartitems);
    cartData[itemId] = quantity;
    setCartitems(cartData);
    toast.success("Cart Updated");
  };

  //Remove Product from cart

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartitems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed from cart");
    setCartitems(cartData);
  };


  // Get Cart Item Count

  const getCartCount =() =>{
    let totalCount = 0;
    for(const item in cartitems){
         totalCount += cartitems[item]
    }
    return totalCount
  }

  //Get Carts Total Amount

  const getCartAmount = () =>{
    let totalAmount = 0
    for( const items in cartitems){
    let itemInfo = products.find((product) => product._id === items)
    if(cartitems[items] > 0){
            totalAmount += itemInfo.offerPrice * cartitems[items]
    }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // Update Database Cart Items
useEffect(() => {
  const updateCart = async () => {
    try {
      const { data } = await axios.post('/api/cart/update', { cartitems });
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user) {
    updateCart();
  }
}, [cartitems]);


  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addtocart,
    updateCartItem,
    removeFromCart,
    cartitems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    setCartitems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};


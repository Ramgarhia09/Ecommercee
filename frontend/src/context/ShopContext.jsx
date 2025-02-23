import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // Add to Cart 
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }


      let cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
     if(cartData[itemId][size]){
      cartData[itemId][size] +=1;
     }
     else{
      cartData[itemId][size] = 1;
    }

      }

      
      else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1;
      }
    
    

    setCartItems(cartData)

    if(token){
      try {
        await axios.post(backendUrl +'/api/cart/add',{itemId,size},{headers:{token}})

      } catch (error) {
        console.log("error")
        toast.error(error.meassage)
      }

    }
    
  };

  



  // ✅ Get Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const size in cartItems[items]) {

try {
  if (cartItems[items][size] > 0) {
    totalAmount += itemInfo.price * cartItems[items][size];
  }
} catch (error) {
  console.error("Error fetching products", error);
  toast.error(error.message);
}
      }
    }
    return totalAmount;
  };

  // ✅ Fetch Products Data
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list');
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    
    } catch (error) {
      console.error("Error fetching products", error);
      toast.error(error.message);
    }
  };

// ✅ Fetch Products on Mount
useEffect(() => {
  getProductsData();
}, []);

  // ✅ Fetch User Cart (Fixed)
 
const getUserCart = async (token) => {
  
  try {
    const response = await axios.post(backendUrl +'api/cart/get', {
      headers: {token},
    });

    if (response.data.success) {
      setCartItems(response.data?.cartData); // Ensure cartData is always valid
    } else {
      toast.error("Failed to fetch cart data.");
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    toast.error(error.response?.data?.message || "Error fetching cart data.");
  }
};

// ✅ Get User Cart when Token Changes
useEffect(() => {
  if (!token &&localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'))
    getUserCart(localStorage.getItem('token'));
  }
}, []);

  // ✅ Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };






  // ✅ Update Quantity (Fixed)
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity

    setCartItems(cartData)

    if(token){
      try {
        await axios.post(backendUrl +'api/cart/update',{itemId,size,quantity},{headers:{token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };


  // ✅ Provide Context Values
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

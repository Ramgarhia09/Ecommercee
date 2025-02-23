import userModel from "../models/userModel.js";

// Add product to user's cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // Find the user
    const userData = await userModel.findById(userId);

    let cartData =await userData.cartData;

    // Check if the item already exists in the cart
    if (cartData[itemId]) {
      if(cartData[itemId][size]){
          cartData[itemId][size] = + 1; // Increment or initialize size quantity
      
    } else {
      cartData[itemId] = 1 ; // Initialize item with size
    }
  }
  
    else{
      cartData[itemId] = {}
      cartData[itemId][size]  = 1
    }

    // Update the user's cart
    await userModel.findByIdAndUpdate(userId, { cartData } );

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product quantity in the cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    
     // Find the user
    const userData = await userModel.findById(userId);


    let cartData = await userData.cartData
    // Update the cart in the database
    await userModel.findByIdAndUpdate(userId, cartData);

    res.json({ success: true, message: "Cart updated", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's cart
const getUserCart = async (req,res) => {

  try {
    const {userId} = req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData
    res.json({success:true,cartData})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}



export { addToCart, updateCart, getUserCart };

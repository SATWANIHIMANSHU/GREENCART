import User from "../models/User.js"
// Update User CartData : /api/cart/update

export const updateCart  = async (req, res) =>{
 try {
    const userId = req.user.id;    
    const { cartitems } = req.body;  
    await User.findByIdAndUpdate(userId, {
  cartItems: cartitems   
})
    res.json({ success: true, message: "Cart Updated" });
 } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
 }
}
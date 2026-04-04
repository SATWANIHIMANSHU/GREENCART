import Order from "../models/Order.js";
import Product from "../models/Product.js";
import axios from "axios";
import User from "../models/User.js";
// place order COD: /api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user.id;
const { items, address } = req.body;

   const userData = await User.findById(userId);

    if (!address || items.length === 0) {
    return  res.json({ success: false, message: "Invalid Data" });
    }

    // calculate amount using items

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add Tax Charge(2%)

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// place order online: /api/order/cashfree
export const placeOrderCashfree = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];

    // Calculate amount
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);

      if (!product) {
        throw new Error("Product not found");
      }

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tax (2%)
    amount += Math.floor(amount * 0.02);

    // Create order in DB
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Create Cashfree order
    const response = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/orders`,
      {
        order_id: order._id.toString(),
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: userId.toString(),
         customer_email: userData.email,
          customer_phone: userData.phone || "9999999999",
        },
        order_meta: {
          return_url: `http://localhost:5173/verify?order_id=${order._id}`,
        },
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "Content-Type": "application/json",
          "x-api-version": "2022-09-01",
        },
      }
    );

    return res.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: order._id,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const verifyCashfreePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // prevent duplicate
    if (order.isPaid) {
      return res.json({ success: true });
    }

    const response = await axios.get(
      `${process.env.CASHFREE_BASE_URL}/orders/${orderId}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      }
    );

    if (response.data.order_status === "PAID") {
      await Order.findByIdAndUpdate(orderId, { isPaid: true });

      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }

  } catch (error) {
    return res.json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};


export const cashfreeWebhook = async (req, res) => {
  try {
    const crypto = await import("crypto");

    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];
    const body = JSON.stringify(req.body);

    const generatedSignature = crypto
      .createHmac("sha256", process.env.CASHFREE_SECRET_KEY)
      .update(timestamp + body)
      .digest("base64");

    if (generatedSignature !== signature) {
      return res.status(400).send("Invalid signature");
    }

    const orderId = req.body?.data?.order?.order_id;

    const order = await Order.findById(orderId);

    if (!order || order.isPaid) {
      return res.json({ success: true });
    }

    if (req.body?.type === "PAYMENT_SUCCESS_WEBHOOK") {
      await Order.findByIdAndUpdate(orderId, { isPaid: true });
    }

    if (req.body.type === "PAYMENT_FAILED_WEBHOOK") {
      await Order.findByIdAndDelete(orderId);
    }

    return res.json({ success: true });

  } catch (error) {
    return res.status(500).send("Webhook error");
  }
};



// Get Orders by User ID : /api/order/user


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from JWT

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders (for seller / admin) : /api/order/seller

export const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find({
            $or : [{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1});
    res.json({ success: true, orders });
    } catch (error) {
         console.error(error.message);
    res.json({ success: false, message: error.message });
    }
}
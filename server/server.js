import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// ❌ REMOVE await (important for Vercel)
connectDB();
connectCloudinary();


// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://greencart-lime-six.vercel.app'
];


// ✅ FIXED CORS (IMPORTANT)
app.use(cors({
  origin: function (origin, callback) {
    console.log("🌍 Origin:", origin); // debug

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, origin); // ✅ IMPORTANT FIX
    } else {
      console.log("❌ Blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// ❌ REMOVE THIS LINE (VERY IMPORTANT)
// app.use(cors());


// Middleware
app.use(express.json());
app.use(cookieParser());


// Test route
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});


// Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);


// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
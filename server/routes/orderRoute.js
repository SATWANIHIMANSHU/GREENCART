import express from 'express';
import authUser from '../middlewares/authUser.js';
import { cashfreeWebhook, getAllOrders, getUserOrders, placeOrderCashfree, placeOrderCOD, verifyCashfreePayment } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';


const orderRouter = express.Router();

orderRouter.post('/cod',authUser, placeOrderCOD)
orderRouter.get('/user',authUser, getUserOrders)
orderRouter.get('/seller',authSeller, getAllOrders)
orderRouter.post('/cashfree',authUser, placeOrderCashfree)
orderRouter.post('/verify', authUser, verifyCashfreePayment);
orderRouter.post('/webhook/cashfree', cashfreeWebhook);

export default orderRouter;
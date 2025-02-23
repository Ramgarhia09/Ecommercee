import express from 'express'
import {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe}from '../controllers/orderController.js'
import adminAuth from'../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router()

//admin feature
orderRouter.post('/list',adminAuth ,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

//user feature

orderRouter.post('/userOrders',authUser,userOrders)

//verify payment

orderRouter.post('/verifyStripe',authUser,verifyStripe)
export default orderRouter



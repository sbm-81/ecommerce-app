import orderModel from "../models/orderModel.js";
import Stripe from 'stripe'


//global variables
const currency='usd'
const deliveryCharge=10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing order using cod method
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await orderModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, msg: "Order placed successfully" })
    } catch (err) {
        console.error(err);
        req.json({ success: false, message: err.message })
    }

}
//placing order using Stripe method
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentId } = req.body;
        const {origin}=req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:deliveryCharge*100
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
    
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })
        res.json({ success: true, session_url: session.url })

    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message })
    }

}

//verify payment using Stripe method
export const verifyStripe = async (req, res) => {
    const {orderId,success,userId}=req.body
    try{
        if(success){
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, msg: "Payment successful" })
        }else{
            res.json({ success: false, msg: "Payment failed" })
        }
    }catch(error){
        console.error(error)
        res.json({success:false,message:error.message})
    }

}

//placing order using Razorpay method
export const placeOrderRazorpay = async (req, res) => {

}


//all orders deta for adming pannel
export const allOrders = async (req, res) => {
    try{
        const orders =await orderModel.find({})
        res.json({ success: true,orders})
    }catch (err) {
        console.error(err)
        res.json({success:false,message:err.message})
        
    }

}

//User Order Data for frontend
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (err) {
        console.error(err);
        req.json({ success: false, message: err.message })
    }
 
}

//Update order status
export const updateStatus = async (req, res) => {
    try{
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message:'Status Updated' })
    }catch (err) {
        console.error(err)
        res.json({ success: false, message: err.message })
    }

}


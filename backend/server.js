import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import reviewRouter from './routes/reviewRoute.js';


//App Config
const app = express();
const port=process.env.PORT || 4000;
connectDB()
connectCloudinary()

//Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(cors({ allowedHeaders: ['Content-Type', 'token'] }));

//Api endpoints
app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api', reviewRouter);        // <— add this


app.get('/', (req, res) => {
    res.send('API Working...');
})
app.listen(port, () => console.log(`Server running on port ${port}`));





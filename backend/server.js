import express from 'express'

import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/Mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
// import multer from 'multer';

// Ensure your multer configuration is correct and imported if it's in another file.

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now());
//     }
//   });
  
//   const upload = multer({ storage: storage });




//app config
const app = express()
const port = process.env.PORT|| 5000
// 
connectDB();
connectCloudinary();



//middlewares

app.use(express.json())
app.use(cors())
//api endpoints


app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>console.log('server started on Port: '+port))
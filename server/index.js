/* eslint-disable no-undef */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from 'morgan';
import kpiRoutes from './routes/Kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from "./routes/transaction.js";
import Product from './models/Product.js';
import KPI from './models/KPI.js';
import Transaction from './models/Transaction.js';
import {kpis, products, transactions} from './data/data.js';


// CONFIGURATIONS

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// ROUTES

app.use("/Kpi",kpiRoutes)
app.use("/Product",productRoutes)
app.use("/transaction",transactionRoutes)

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;

mongoose
.connect(process.env.MONGO_URL , 
)
.then(async()=>{
    app.listen(PORT,()=>console.log(`server port : ${PORT}`))
    // await mongoose.connection.db.dropDatabase();  // clearing all the data which was previously used before getting real data..
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
}).catch((error)=>console.log(`${error} did not connect!!`))
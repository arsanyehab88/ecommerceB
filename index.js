import * as dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan';
import express from "express";
import { connecting } from './DB/connection.js';
import { init } from './use.js';

import cors from 'cors'

const app = express();
const port = 3001

app.use(cors())
app.use(express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"))



init(app)


connecting()
app.listen(process.env.PORT || port, () => {
    console.log("Server is listening on " + port);
})
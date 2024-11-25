require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const AuthRouter = require('./routers/Authentication');
const AuthorizationRouter = require('./routers/Authorization');

const app = express();

// use uiltities middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// use routers
app.use(AuthRouter);
app.use("/user", AuthorizationRouter);


// server configuration
const PORT = process.env.PORT;
app.listen(PORT, (err)=>{
    if(err){
        console.log("can't able to run server!");
        return;
    }
    console.log(`Server is running on port ${PORT}`);
})
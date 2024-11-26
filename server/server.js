require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const AuthRouter = require('./routers/Authentication');
const AuthorizationRouter = require('./routers/Authorization');
const WorkspaceRouter = require('./routers/Workspace');

const app = express();

// use uiltities middlewares
app.use(cors({
    origin: process.env.DEV ? process.env.DEV_FRONT_URL : process.env.PRODUCTION_FRONT_URL,
    credentials: true, // Allow cookies
}));
app.use(cookieParser());
app.use(bodyParser.json());

// use routers
app.use(AuthRouter);
app.use("/user", AuthorizationRouter);
app.use("/workspace", WorkspaceRouter);

// server configuration
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) {
        console.log("can't able to run server!");
        return;
    }
    console.log(`Server is running on port ${PORT}`);
})
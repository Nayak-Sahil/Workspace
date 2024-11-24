require('dotenv').config();
const express = require('express');
const app = express();


const PORT = process.env.PORT;
app.listen(PORT, (err)=>{
    if(err){
        console.log("can't able to run server!");
        return;
    }
    console.log(`Server is running on port ${PORT}`);
})
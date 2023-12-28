const express = require('express');
const app = express();
const User = require('../models/User');



app.post('/register', async (req,res)=>{
          
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
        
    });
    const savedUser = user.save();
    console.log('user saved y azeby ');
    res.send(savedUser);
       
   
});


module.exports = app;

const express = require('express');
const app = express();
const User = require('../models/User');
const { validationRegister ,loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// all about Register
/********************************************************* */
app.post('/register', async (req, res) => {
    console.log(req.body);
    // VALIDATE BEFORE SAVING A USER 
    const {error} = validationRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    

    // checking if the user exists in the database : 
    const emailExists = await User.findOne({email : req.body.email});
    if(emailExists) return res.status(400).send('email already exists , choose a new one ');
    // const usernameExists = await User.findOne({username : req.body.username});
    // if(usernameExists) return res.status(400).send('username already exists , choose a new one !')

    //Hashing the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);



    // create new user 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try{
        const savedUser = await user.save();  // Use await to wait for the promise to resolve
        console.log('User saved');
        res.send({user : user._id});
    }catch(err){
        res.status(400).send(err);

    }
        
  
});


//all about Login 
/********************************************************* */
app.post('/login', async (req,res) => {

    // VALIDATE BEFORE logiging A USER 
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the user exists in the database : 
        const user = await User.findOne({email : req.body.email});
        if(!user) return res.status(400).send(' Email not found ! ');
    //checking password is correct 
        const valiPassword = await bcrypt.compare(req.body.password,user.password);
        if(!valiPassword) return res.status(400).send('Invalid password');

    //Create and assign token 
        const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token',token).send(token);


});

module.exports = app;

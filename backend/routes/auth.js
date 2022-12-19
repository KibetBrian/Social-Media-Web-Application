const router = require('express').Router();
const User = require ('../models/user');
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

//Registration
router.post('/register', async (req, res)=>
{
    try
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            }
        )

        const user = await newUser.save();
        res.status(200).json("Registered");
    }
    catch(err){
        res.status(500).json(err);
    }  
})

//Login
router.post('/login', async (req, res)=>
{
    try
    {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("User not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json("Wrong Password");

        res.send (user);
    }catch(err)
    {
        res.json(err);
        console.log(err)
    }
});
//Check existing username
router.get('/register/usernametaken', async (req, res)=>
{
    try
    {
        const enteredUserName = req.body.username;
        const checkIfTaken = await User.findOne({username: enteredUserName});
        res.status(200).json(!checkIfTaken)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})
module.exports = router;
const router = require('express').Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    if (!(req.body.password && req.body.email && req.body.userName)) {
        return res.status(403).json("Username, email and password required");
    }

    try {

        const userNameExists = await User.findOne({ username: req.body.userName });
        if (userNameExists) {
            return res.status(409).json("Username already taken");
        };

        const emailTaken = await User.findOne({ email: req.body.email });
        if (emailTaken) {
            return res.status(409).json("Email already taken;")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const { password, ...others } = user._doc;

        res.status(200).json({
            message: "User registered",
            user: others
        });
    } catch (err) {
        res.status(500).json("Internal Server error");
        console.log("Error", err)
    }
});

router.post('/login', async (req, res) => {
    if (!(req.body.email && req.body.password)) {
        return res.status(500).json("Email and password required");
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send("Invalid email or password")
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(404).json("Invalid email or password");
        }

        const { password, ...others } = user;

        return res.status(200).json({
            message: "Login Successfull",
            user: user
        });

    } catch (err) {
        res.status(500).json("Internal server error");
        console.log(err)
    }
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');
const categoryRoute = require('./routes/categories');
const forgotPasswordRoute = require('./routes/forgotPassword')
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { connect } = require('http2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT_NUMBER || 8080;
dotenv.config();

//Database Connection
mongoose.connect(process.env.MONGO_URI).then(res => {
    if (res.connections) {
        console.log('Database connected')
    } else {
        console.log("Database connection failed. Error", res)
    }
});

//Multer //Image Upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/assets')
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name)
    }
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json("Image Uploaded")
    }
    catch (err) {
        res.status(500).json("Internal server error");
        console.log(err)
    }
})

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use("/assets", express.static(path.join(__dirname, "images/assets")))

//Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/conversation', conversationRoute);
app.use('/api/v1/messages', messageRoute);
app.use('/api/v1/forgot-password', forgotPasswordRoute);

app.listen(PORT, () => {
    console.log("Server started");
})

const express = require ('express');
const mongoose = require ('mongoose');
const morgan = require ('morgan');
const dotenv = require ('dotenv');
const helmet = require ('helmet');
const userRoute = require ('./routes/users');
const authRoute = require ('./routes/auth');
const postRoute = require ('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require ('./routes/messages');
const categoryRoute = require('./routes/categories');
const forgotPasswordRoute = require('./routes/forgotPassword')
const multer = require ('multer');
const path = require ('path');
const jwt = require('jsonwebtoken');
const { connect } = require('http2');
const cors = require('cors');



const app = express();
dotenv.config();

//Database Connection
mongoose.connect(process.env.mongo_url).then(res=>{
   if(res.connections)
   {
       console.log('Database connected')
   }
   else 
   {
       console.log(res)
   }
})
//Cors
app.use(cors());




//Multer //Image Upload
const storage = multer.diskStorage({
    destination: (req, file, callback) =>
    {
        callback(null, 'images/assets')
    },
    filename: (req, file, callback) =>
    {
        callback(null, req.body.name)
    }
});

const upload = multer ({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res)=>
{
    try
    {
        return res.status(200).json("Image Uploaded")
    }
    catch(err)
    {
        console.log(err)
    }
})

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


app.use("/assets", express.static(path.join(__dirname, "images/assets")))

//Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/forgot-password', forgotPasswordRoute);

app.listen(process.env.PORT_NUMBER, 8080, ()=>
{
    console.log("Server started");
})

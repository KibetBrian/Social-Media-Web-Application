const router = require ('express').Router();
const User = require('../models/user');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

//Get user password, verify and sign
router.post('/', async (req, res)=>
{
    const userEmail = req.body.email;
    try 
    {
       const user = await User.findOne({email: userEmail});
       if (!user)
       {
            res.status(200).json(false)
       }
       else 
       {
             const secret = process.env.JWT_SECRET + user.password;
             const payload = 
             {
                 id: user._id,
                 email: user.email
             }
             const token = jwt.sign(payload, secret, {expiresIn: '15m'});
             //Link to be send to the user's email
             const link = `http://localhost:3000/forgot-password/reset-password/${user._id}/${token}`;
             console.log(link)
             res.status(200).json(true)
       }
    }
    catch (err)
    {
        console.log(err);
    }
});

router.post('/reset-password/:id/:token', async (req, res, next)=>
{
    const {id, token} = req.params;
    try 
    {
        const user = await User.findById(id);
        if(user)
        {
            try 
            {
                const secret = process.env.JWT_SECRET + user.password;
                const verify =jwt.verify(token, secret);
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
                const updatedUser = await User.findByIdAndUpdate(verify.id, {password: hashedPassword});
                res.status(200).json('Password Updated');
            }
            catch(err)
            {
                console.log(err.message)
            }
        }
        else 
        {
            res.status(403).json('Invalid token')
        }
    }
    catch (err)
    {
        console.log(err)
    }
    
})

module.exports = router;
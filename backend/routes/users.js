const router = require('express').Router();
const bcrypt = require ('bcrypt');
const user = require('../models/user');
const { deleteOne } = require('../models/user');
const User = require ('../models/user');



//update user
router.put('/:id', async (req, res)=>{

   const user = new User();

   if (req.body.userId === req.params.id || req.body.isAdmin)
   {
      if (req.body.password)
      {
         try 
         {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);             
         } 
         catch (err)
         {
            return res.status(500).json(err)
         }
      }
      try
      {
         const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
         res.status(200).json("User Updated")
      } catch (err)
      {
         return res.status(500).json("User not updated");
      }

   }
   else
   {
      return res.status(401).json('You can only update your account')
   }
});
//delete a user
router.delete('/:id', async (req, res)=>
{
   if(req.body.userId === req.params.id || req.body.isAdmin)
   {
      try
      {
         const user = await User.findByIdAndDelete(req.params.id);
         res.status(200).json("Account Deleted Successfully");
      }
      catch(err)
      {
         return res.status(500).json("Invalid ");
      }
   }
   else
   {
      res.status(500).json("Error occurred");
   }
})
//get a user
router.get('/', async (req, res)=>
{
   const userId = req.query.userId;
   const username = req.query.username;
   try 
   {
      const user =userId 
      ? await User.findById(userId)
      : await User.findOne ({username: username})
      ;
      const {password,  ...other} = user._doc
      res.status(200).json(other);
   }
   catch (err)
   {
      res.status(200).json(err)
   }
})
//follow a user
router.put('/:id/follow', async (req, res)=>
{
   if (req.body.userId !== req.params.id)
   {
      try 
      {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if(!user.followers.includes(req.body.userId))
         {
            await user.updateOne({$push: {followers: req.body.userId}});
            await currentUser.updateOne({$push: {following: req.params.id}});
            res.status(200).json("Followed a user")
         }else 
         {
            res.status(403).json("You are already a follower")
         }
      }
      catch(err)
      {
         res.status(500).json(err)
      }
   }else 
   {
      res.status(403).json("You can't follow yourself");
   }
})
//unfollow a user
router.put('/:id/unfollow', async (req, res)=>
{
   
      try
      {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
   
         if (user.followers.includes(req.body.userId))
         {
            await user.updateOne({$pull: {followers: req.body.userId}});
            await currentUser.updateOne({$pull: {following: req.params.id}});
            res.status(200).json("Unfollowed")
         }
      }catch (err)
      {
         res.status(500).json(err)
      } 
})

//Fetch following
router.get('/friends/:userId', async (req, res)=>
{
   try 
   {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
         user.following.map(followId=>
            {
               return User.findById(followId)
            })
      )
      let friendsList = [];
      friends.map(friend =>
         {
            const {_id, username, profilepicture} = friend;
            friendsList.push({_id, username, profilepicture})
         })
      res.status(200).json(friendsList)
   }catch (err)
   {
      res.status(500).json(err)
   }
})
module.exports = router;

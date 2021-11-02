const router = require ('express').Router();
const { findById, findOneAndDelete } = require('../models/post');
const Post = require('../models/post');
const User = require ('../models/user')
const Comment = require('../models/comment')
 
//create a post
router.post('/', async(req, res)=>
{
    const newPost = new Post(req.body);
    try{ 
            const savedPost = await newPost.save();        
            res.status(200).json("Post Uploaded")
        }
    catch (err)
        {
                res.status(500).json(err);
        }
})
//Update a post
router.put('/:id/update', async (req, res)=>
{
    try {
            const post = await Post.findById(req.params.id);

            if (post.username === req.body.username)
                {
                    try 
                    {
                        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});
                        res.status(200).json("Post Updated");
                    }
                    catch (err)
                    {
                        res.status(500).json(err);
                    }
                }
            else 
            {
                res.status(401).json("You can only update your post");
            }

        } 
    catch (err) 
        {
           res.status(500).json(err)     
        }
})

//Delete a post
router.delete('/:id/delete', async (req, res)=>{
    const post = await Post.findById(req.params.id);
    try 
    {
        if (req.body.username === post.username)
        {
            try
            {
                const deletePost = await post.delete();
                res.status(200).json("Post has been deleted");
            }catch (err)
            {
                res.status(500).json(err)
            }
        }
        else 
        {
            res.status(403).json("You can only delete your post")
        }
    }catch(err)
    {
        res.status(500).json(err)
    }
})
//Like / Dislike
router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a post
router.get('/:id/getpost', async (req, res)=>
{
    try 
    {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err)
    {
        res.status(500).json("Post doesn't exist")
    }
})
//get all user posts
router.get('/', async (req, res)=>
{
    const username = req.query.user;
    const category = req.query.cat;
    try 
    {
        let posts;

        if(username)
        {
            posts = await Post.find({username})
        }
        else if(category) 
        {
           posts = await Post.find({categories:
            {
                $in: [category]
            }})
        }
        else 
        {
            posts = await Post.find();
        }
        res.status(200).json(posts)
    }catch(err)
    {
        res.status(500).json(err)
    }
})
//Get all user's post
router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//Get timeline posts

router.get("/timeline/:userId", async (req, res) => {

    try {

      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );

      res.status(200).json(userPosts.concat(...friendPosts));
    } 
    catch (err)
    {
      res.status(500).json(err);
    }
  });
//Create a comment
router.post('/comment/:id', async(req, res)=>
{
    const postId = req.params.id;
    const userId = req.body.userId;
    const comment = req.body.comment
    try
    {
        const newComment = new Comment({postId, userId, comment});
        await newComment.save();
        res.status(200).json(newComment)
    }
    catch (err)
    {
        res.status(500).json(err)
    }
})
//Get comments
router.get('/comment/:id', async (req, res)=>
{
    const postId = req.params.id;
    try 
    {
        const comments = await Comment.find({postId: postId});
        res.status(200).json(comments)
    }
    catch (err)
    {
        res.status(500).json(err)
    }
})
module.exports = router; 
const router = require ('express').Router();
const messages = require ('../models/Message');

//create a message

router.post('/', async (req, res)=>
{
    const newMessage = new messages(req.body);
    try 
    {
       const savedMessage = await newMessage.save();
       res.status(200).json(savedMessage)
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//Get messages

router.get('/:conversationId', async (req, res)=>
{
    try
    {
        const messagesStored = await messages.find({conversationId: req.params.conversationId});
        res.status(200).json(messagesStored)
    }
    catch (err)
    {
        res.status(500).json(err)
    }
})

module.exports = router;
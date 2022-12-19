const router = require ('express').Router();
const Category = require ('../models/category');

//Creating category
router.post('/', async (req, res)=>{

    const newCategory = new Category(req.body);
    try
    {
        const savedCategory = await newCategory.save();
        res.status(200).json("Category Saved")
    }catch(err)
    {
        res.status(500).json(err)
    }
})

//Fetching all categories

router.get('/', async (req, res)=>
{
    try
    {
        const allCategories = await Category.find();
        res.status(200).json(allCategories);
    }
    catch (err)
    {
        res.status(500).json(err)
    }
})

module.exports = router;
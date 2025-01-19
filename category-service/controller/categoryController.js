const Category = require('../models/category');

exports.createCategory = async (req,res,next) => {
    const category = new Category({
        userId:req.user.userId,
        name: req.body.name,
        description: req.body.description
    });
     try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
     } catch (err) {
        res.status(404).json({message: err.message});
     }
};

exports.getCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.getCategory =async (req,res) => {
    let categoryId = req.params.categoryId;

    if (!categoryId) {
        categoryId = req.body.categoryId;
    }
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json("Category not Found.");
      }
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
};


exports.deleteCategory = async(req,res,next)=>{
    try{
    const categoryId = req.params.categoryId;
    const category=await Category.findByIdAndDelete(categoryId);
    res.status(200).send(category);
    }
    catch(err){
    console.error('There is an error occurred while deleting the category',err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!category) {
        return res.status(400).json({
          message: "category could not be found.",
          success: false,
        });
      }
  
      return res.status(200).json({
        category,
        success: true,
      });
    } catch (err) {
      res.status(400).json({
        message: err,
        success: false,
      });
    }
  };
import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(200).send({
      success: true,
      message: "Category Created successfully",
      category,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error creating category",
            error,
        });
    }
};

// Update category controller
const updateCategoryController = async (req, res) => {
    try {
        const { name, isFeatured } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name), isFeatured },
            { new: true }
        );
      
        res.status(200).send({
            success: true,
            message: "Category Updated successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error creating category",
            error,
        });
    }
};

const allCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});

        res.status(200).send({
            success: true,
            message: "Category List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error creating category",
            error,
        });
    }
};

// Delete category
const deleteCategoryController = async (req, res) => {
    try {
      const {id} = req.params;
      await categoryModel.findByIdAndDelete(id);
  
      res.status(200).send({
        success: true,
        message: "Delete Category"
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
        message: "Error deleting category",
      });
    }
};

export {createCategoryController, updateCategoryController, allCategoryController, deleteCategoryController}
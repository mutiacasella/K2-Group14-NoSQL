const Category = require("../models/CategoryModel");

// Add Category
async function addCategory(req, res) {
    try {
        const { category_name, description } = req.body;

        const category = new Category({
            category_name: category_name,
            description: description
        });
        await category.save();

        res.status(200).json({
            success: true,
            message: "Successfully registered category",
            data: category
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Get All Categories (descending order)
async function getAllCategory(req, res) {
    try {
        const categories = await Category.find().sort({ updatedAt: -1 });
        res.status(200).json({
            success: true,
            message: "Successfully get all categories",
            data: categories
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Category By ID
async function getCategoryById(req, res) {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            throw new Error("Category not found");
        }

        res.status(200).json({
            success: true,
            message: `Found category with id ${categoryId}`,
            data: category
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Update Category
async function updateCategory(req, res) {
    try {
        const { categoryId } = req.params;
        const { category_name, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {
                category_name: category_name,
                description: description
            },
            { new: true }
        );

        if (!updatedCategory) {
            throw new Error("Category not found");
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated category",
            data: updatedCategory
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Delete Category
async function deleteCategory(req, res) {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            throw new Error("Category not found");
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted category",
            data: deletedCategory
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

module.exports = {
    addCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}
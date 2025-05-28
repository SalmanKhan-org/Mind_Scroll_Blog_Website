const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Category = require("../../models/categorySchema");

exports.addCategory = catchAsyncError(
    async (req, res, next) => {
        const { name, slug } = req.body;

        const category = new Category({
            name, slug
        });
        await category.save();

        res.status(201).json({
            success: true,
            message:"Category Added Successfully"
        })
    }
)
const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Category = require("../../models/categorySchema");

exports.getAllCategories = catchAsyncError(
    async (req, res, next) => {
        const allCategories = await Category.find().sort({ createdAt: -1 }).lean().exec();

        res.status(200).json({
            success: true,
            allCategories
        })
    }
)
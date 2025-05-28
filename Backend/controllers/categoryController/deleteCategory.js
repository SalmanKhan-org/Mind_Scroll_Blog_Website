const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Category = require("../../models/categorySchema");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.deleteCategory = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let category = await Category.findById(id);
        if (!category) {
            return next(new ErrorHandler("Category Not Found", 404));
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message:"Category Deleted Successfully"
        })
    }
)
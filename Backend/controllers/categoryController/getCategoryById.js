const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Category = require("../../models/categorySchema");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.getCategoryById = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return next(new ErrorHandler("Category Not Found", 404));
        }

        res.status(200).json({
            success: true,
            category
        })
    }
)
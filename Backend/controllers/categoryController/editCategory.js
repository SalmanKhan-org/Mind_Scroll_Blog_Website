const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Category = require("../../models/categorySchema");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.editCategory = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        const { name, slug } = req.body;

        let category = await Category.findById(id);

        if (!category) {
            return next(new ErrorHandler("Category Not Found", 404));
        }

        category = await Category.findByIdAndUpdate(id, { name, slug }, { new: true });

        res.status(200).json({
            success: true,
            message:"Category Updated Successfully"
        })
    }
)
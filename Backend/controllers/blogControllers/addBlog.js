const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");
const ErrorHandler = require("../../utils/ErrorHandler");
const { uploadImageOnCloudinary } = require("../../utils/uploadImageOnCloudinary");
const entities = require("entities");

exports.addBlog = catchAsyncError(
    async (req, res, next) => {
        const { category, title, slug, blogContent } = req.body;
        const author = req?.user._id;
        const file = req?.file;

        if (!file) {
            return next(new ErrorHandler('Image is required', 404));
        }

        const image = await uploadImageOnCloudinary(file);

        let blog = new Blog({ category, title, slug, blogContent: entities.encode(blogContent), author,image });

        await blog.save();

        res.status(200).json({
            success: true,
            message: 'Blog Uploaded Successfully'
        })

    }
)
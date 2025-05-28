const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");
const ErrorHandler = require("../../utils/ErrorHandler");
const entities = require("entities");
const { uploadImageOnCloudinary } = require("../../utils/uploadImageOnCloudinary");

exports.updateBlog = catchAsyncError(
    async (req, res, next) => {
        const { category, title, slug, blogContent } = req.body;
        const { id } = req.params;

        const blog = await Blog.findById(id);
        if (!blog) {
            return next(new ErrorHandler('Blog is not exist', 404));
        }
        blog.category = category;
        blog.title = title;
        blog.slug = slug;
        blog.blogContent = entities.encode(blogContent);

        const file = req?.file;

        if (!file) {
            return next(new ErrorHandler('Image is required', 404));
        }

        const image = await uploadImageOnCloudinary(file);

        blog.image = image;

        await blog.save();

        res.status(200).json({
            message: "Blog updated successfully",
            success:true
        })
    }
)
const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const { uploadImageOnCloudinary } = require("../../utils/uploadImageOnCloudinary");

exports.updateProfile = catchAsyncError(
    async (req, res, next) => {
        const { name, email, bio } = req.body;
        const file = req.file;

        let user = req?.user;

        user.name = name;
        user.email = email;
        user.bio = bio;

        if (file) {
            let imageUrl = await uploadImageOnCloudinary(file);
            user.avatar = imageUrl;
        }

        await user.save();

        res.status(200).json({
            message: "User Updated Successfully",
            success:true
        })
    }
)
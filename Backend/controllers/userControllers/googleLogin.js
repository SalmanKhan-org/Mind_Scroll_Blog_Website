const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const bcryptjs = require("bcryptjs");
const User = require("../../models/userModel");
const { sendToken } = require("../../utils/sendToken");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.googleLogin = catchAsyncError(
    async (req, res, next) => {
        const { name, email , avatar } = req.body;

        if (!email) {
            return next(new ErrorHandler("Missing Information", 400));
        }
        let user = await User.findOne({ email });
        if (!user) {
            const password = await bcryptjs.hash(Math.floor(Math.random() * 1000000).toString(), 10);
            let newUser = new User({ name, email, avatar, password });

            user = await newUser.save();
        }

        await sendToken(user, res, 200, "User Logged in Sucessfully");
    }
)
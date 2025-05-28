const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const User  = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const bcryptjs = require("bcryptjs");
const { sendToken } = require("../../utils/sendToken");

exports.login = catchAsyncError(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Missing Information", 400));
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

        await sendToken(user, res, 200, "User Logged in Sucessfully");
    }
)
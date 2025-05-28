const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const  User = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const bcryptjs = require("bcryptjs");
const { sendToken } = require("../../utils/sendToken");

exports.register = catchAsyncError(
    async (req, res, next) => {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler("User Already Exist", 403));
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        let newUser = new User({ name, email, password: hashPassword });

        newUser = await newUser.save();

        sendToken(newUser,res,201,"User Registered Successfully")
    }
)
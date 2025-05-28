const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncError } = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncError(
    async (req, res, next) => {
        const token  = req.cookies.token;

        if (!token) {
            return next(new ErrorHandler("Please Login", 401));
        }

        let decodedData = await jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decodedData) {
            return next(new ErrorHandler("Invalid Token", 400));
        }
        req.user = await User.findById(decodedData?.id);

        next();
    }
)

exports.isAdmin = (req, res, next) => {
    const user = req?.user;

    if (user.role !== 'admin') {
        return next(new ErrorHandler("Access denied", 401));
    }
    next();
}
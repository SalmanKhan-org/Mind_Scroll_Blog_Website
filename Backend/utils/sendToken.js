exports.sendToken = async (user, res, statusCode, message) => {
    const token = user.getJWTToken();

    const tokenOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie("token", token, tokenOptions).json({
        success: true,
        message,
        user
    })
}
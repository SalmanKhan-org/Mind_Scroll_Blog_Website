const express = require("express");
const { register } = require("../controllers/userControllers/register");
const { logout } = require("../controllers/userControllers/logout");
const { login } = require("../controllers/userControllers/login");
const { googleLogin } = require("../controllers/userControllers/googleLogin");
const { isAuthenticated } = require("../middlewares/authToken");
const { updateProfile } = require("../controllers/userControllers/updateProfile");
const { upload } = require("../middlewares/multer");
const { getUser } = require("../controllers/userControllers/getUser");
const { getAllUsers } = require("../controllers/userControllers/getAllUsers");
const { deleteUser } = require("../controllers/userControllers/deleteUser");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google-login").post(googleLogin);
router.route("/logout").get(logout);
router.route("/update/profile").put(isAuthenticated, upload.single("avatar"), updateProfile);
router.route("/user/me").get(isAuthenticated, getUser);
router.route("/users/get/all").get(isAuthenticated, getAllUsers)
router.route("/users/:id").delete(isAuthenticated,deleteUser)



module.exports = router;
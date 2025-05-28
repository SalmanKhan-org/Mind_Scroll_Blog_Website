const express = require("express");
const { addCategory } = require("../controllers/categoryController/addCategory");
const { editCategory } = require("../controllers/categoryController/editCategory");
const { getAllCategories } = require("../controllers/categoryController/getAllCategories");
const { getCategoryById } = require("../controllers/categoryController/getCategoryById");
const { deleteCategory } = require("../controllers/categoryController/deleteCategory");
const { isAuthenticated, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.route("/category/new").post(isAuthenticated, isAdmin ,addCategory);
router.route("/category/:id")
    .put(isAuthenticated, isAdmin, editCategory)
    .get(isAuthenticated, isAdmin , getCategoryById)
    .delete(isAuthenticated, isAdmin , deleteCategory);
router.route("/category/get/all").get(getAllCategories);


module.exports = router;
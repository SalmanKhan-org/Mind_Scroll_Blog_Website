const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/authToken");
const { addBlog } = require("../controllers/blogControllers/addBlog");
const { upload } = require("../middlewares/multer");
const { getAllBlogs } = require("../controllers/blogControllers/getAllBlogs");
const { deleteBlog } = require("../controllers/blogControllers/deleteBlog");
const { getBlogById } = require("../controllers/blogControllers/getBlogById");
const { updateBlog } = require("../controllers/blogControllers/updateBlog");
const { getBlogBySlug } = require("../controllers/blogControllers/getBlogBySlug");
const { createComment } = require("../controllers/commentController.js/createComment");
const { getSingleBlogComments } = require("../controllers/commentController.js/getSingleBlogComments");
const { getcount } = require("../controllers/commentController.js/countComments");
const { doLike } = require("../controllers/likeControllers/doLike");
const { countLikes, totalLikes } = require("../controllers/likeControllers/countLikes");
const { getRelatedBlogs } = require("../controllers/blogControllers/getRelatedBlogs");
const { search } = require("../controllers/blogControllers/search");
const { getAllComments } = require("../controllers/commentController.js/getAllComments");
const { deleteComment } = require("../controllers/commentController.js/deleteComment");
const { getBlogsPerUser } = require("../controllers/blogControllers/getBlogsPerUser");
const router = express.Router();

router.route('/blogs/new').post(isAuthenticated, upload.single('image'), addBlog);
router.route("/blogs/get/all").get(getAllBlogs);
router.route("/blogs/user/get/all").get(isAuthenticated, getBlogsPerUser);
router.route("/blogs/get/:slug").get(getBlogBySlug)
router.route("/blogs/:id").delete(isAuthenticated, deleteBlog).get(isAuthenticated, getBlogById).put(isAuthenticated, upload.single('image'), updateBlog);
router.route("/blogs/get-related-blogs/:category").get(getRelatedBlogs)
router.route("/search").get(search)


// Comment routes
router.route("/blogs/comments/new").post(isAuthenticated, createComment);
router.route("/blogs/comments/count/:blogId").get(getcount);
router.route("/blogs/comments/:blogId").get(getSingleBlogComments);
router.route("/comments/get/all").get(isAuthenticated, getAllComments);
router.route("/comments/:id").delete(isAuthenticated,deleteComment)

//Likes routes
router.route("/blogs/:blogId/like").get(isAuthenticated, doLike);
router.route("/blogs/:blogId/:userId/likes/count").get(countLikes)
router.route("/blogs/:blogId/likes/all").get(totalLikes);

module.exports = router;
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./db/connectDB");
const { error } = require("./middlewares/error");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const blogRouter = require('./routes/blogRoutes');
const path = require("path");

app.use(cookieParser());
app.use(express.json());

const DIRNAME = path.resolve();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods:['PUT','POST','GET','DELETE']
}))

app.use("/api/v1", userRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", blogRouter);
//error Middleware
app.use(error);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.use("/*\w", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB();
})
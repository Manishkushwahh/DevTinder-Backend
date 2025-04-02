const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
  );  

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



connectDB()
    .then(() => {
        console.log("Successfully connected to Database");
        app.listen(process.env.PORT , () => {
            console.log("Server is successfully listening on port 7777...");
        });
    })
    .catch((error) => {
        console.error("Cannot connected to Database");
    });

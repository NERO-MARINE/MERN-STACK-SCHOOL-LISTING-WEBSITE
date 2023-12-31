const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const authRoutes = require("./routes/authRoutes");
const forgotPswRoute = require("./routes/forgotPswRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000", "https://naijaschoolsearch.onrender.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
// app.use(express.static('uploads'));
app.use("/uploads", express.static("uploads"));

const conectToMongoDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.on("connected", () => {
  console.log("MONGO db connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MONGO db Disconnected");
});

// use routes
// for testing vercel backend deployment
app.get("/", (req, res) => {
  res.send("pokoloko active");
});
// for testing vercel backend deployment

app.use("/users", userRoutes);
app.use("/schools", schoolRoutes);
app.use("/auth", authRoutes);
app.use("/account", forgotPswRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack, // more details about the error
  });
});

app.listen(process.env.PORT || 5000, () => {
  conectToMongoDb();
  console.log("listening to request at port 5000");
});

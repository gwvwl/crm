const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { httpLogStream } = require("./utils/logger");
// routes
const authRoute = require("./routes/auth.route");
// const productRoute = require("./routes/product.route");
// const categoryRoute = require("./routes/category.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(cookieParser());

// routes on
app.use("/", authRoute);
// app.use("/", productRoute);
// app.use("/", categoryRoute);

app.use(express.static(__dirname + "/upload"));

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "API working fine",
    },
  });
});
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});
module.exports = app;

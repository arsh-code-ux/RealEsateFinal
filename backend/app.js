const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes= require("./routes/propertyRoutes");
const uploadRoutes=require("./routes/uploadRoutes");
const chatRoutes=require("./routes/chatRoutes");
const paymentRoutes=require("./routes/paymentRoutes");
const reviewRoutes=require("./routes/reviewRoutes");
const recommendationRoutes=require("./routes/recommendationRoutes");
const rateLimit=require("express-rate-limit");
const errorMiddleware=require("./middleware/errorMiddleware");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");
const searchRoutes=require("./routes/searchRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
const{
swaggerUi,
specs
}=require(
"./config/swagger"
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(morgan("dev"));
app.use(cookieParser());

const limiter=rateLimit({
windowMs:15*60*1000,max:100});

// Apply rate limiter to API routes only
app.use("/api", limiter);

app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/properties",propertyRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/recommendations",recommendationRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/search",searchRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
  
  app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "dist", "index.html"));
});
} else {
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "API running successfully"
    });
  });
}

app.use(errorMiddleware);

module.exports = app;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const labourRoutes = require("./routes/labourRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map(v => v.trim()) : true,
  credentials: true
}));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." }
});
app.use("/api", apiLimiter);

// Uploaded project images and resumes are served by the API, while the browser
// application runs on a different local origin (for example :5173). Helmet's
// default same-origin resource policy would otherwise block image rendering.
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.resolve(process.env.UPLOAD_DIR || "uploads"))
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Laxmi Construction API is running",
    version: "1.0.0"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "OK", service: "laxmi-construction-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/labour", labourRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

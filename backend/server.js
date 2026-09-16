require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const { ensureAdmin } = require("./src/utils/seedAdmin");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    await ensureAdmin();

    app.listen(PORT, () => {
      console.log(`Laxmi Construction API running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
})();

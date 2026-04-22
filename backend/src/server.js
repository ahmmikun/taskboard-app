import express from "express";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: allowedOrigin,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/notes", notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

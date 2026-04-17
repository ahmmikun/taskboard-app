import express from "express";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

dns.setServers(["8.8.8.8", "8.8.4.4"]);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});

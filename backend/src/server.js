import express from "express";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 5000;
import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import dns  from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();
connectDB();
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

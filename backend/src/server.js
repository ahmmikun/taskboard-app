import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
const app = express();
const PORT = process.env.PORT || 5001;
import dns  from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();
app.use(express.json());
connectDB();
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

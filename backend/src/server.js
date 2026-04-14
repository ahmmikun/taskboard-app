import express from "express";
import dotenv from "dotenv";
const app = express();
const PORT = 5001;
import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
dotenv.config();
connectDB();
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

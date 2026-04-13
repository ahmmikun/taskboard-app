import express from "express";
const app = express();
const PORT = 5001;
import notesRoutes from "./routes/notesRoutes.js";

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

    import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { connectDB } from "./db.js";
import todosRouter from "./routes/todos.js";
import { errorHandler } from "./middleware/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Static frontend
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/api/todos", todosRouter);

// Healthcheck
app.get("/health", (req, res) => res.json({ ok: true }));

// Global error handler (AFTER routes)
app.use(errorHandler);

// Boot
const PORT = process.env.PORT || 3000;
await connectDB();
app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`));

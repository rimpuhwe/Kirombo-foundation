import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
import { initWebSocket } from "./services/WebSocketService.js";
import prisma from "./lib/db.js";

// Routes
import postsRouter from "./routes/posts.js";
import statsRouter from "./routes/stats.js";
import activitiesRouter from "./routes/activities.js";
import uploadRouter from "./routes/upload.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/posts", postsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/upload", uploadRouter);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("[Error]", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Create HTTP server and initialize WebSocket
const httpServer = createServer(app);
const wsService = initWebSocket(httpServer);

// Start server
httpServer.listen(PORT, async () => {
  console.log(`\n📱 Blog Dashboard Backend`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Frontend URL: ${FRONTEND_URL}`);
  console.log(`📊 WebSocket enabled`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Test database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connected\n");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n\n🛑 Shutting down gracefully...");
  await prisma.$disconnect();
  httpServer.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  console.log("\n\n🛑 Shutting down gracefully...");
  await prisma.$disconnect();
  httpServer.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

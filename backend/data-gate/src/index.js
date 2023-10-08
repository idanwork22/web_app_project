import express from "express";
import config from "./config/config";
import { connect } from "./db.js";
import cors from "cors";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import groupRoutes from "./routes/groupRouter";

const startServer = async () => {
  const db = await connect();
  const app = express();
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cors());

  app.use("/users", userRoutes(db)); // Routes
  app.use("/posts", postRoutes(db)); // Routes
  app.use("/groups", groupRoutes(db)); // Routes

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // Replace with your actual frontend URL
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.listen(config.dataGate.port, () => {
    console.log(`DATA GATE is running on port ${config.dataGate.port}`);
  });
};

startServer();

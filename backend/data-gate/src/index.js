import express from "express";
import userRoutes from "./routes/userRoutes";
import config from "./config/config";
import { connect } from "./db.js";

const startServer = async () => {
  const db = await connect();
  const app = express();
  app.use(express.json()); // Middleware for parsing JSON
  app.use(express.urlencoded({ extended: true }));

  app.use("/users", userRoutes(db)); // Routes
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
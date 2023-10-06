import express from "express";
import postsRoutes from "./routes/postsRoutes";
import usersRoutes from "./routes/usersRouter";
import groupsRoutes from "./routes/groupsRoutes";
import config from "./config/config";
import AWS from "aws-sdk";
import cors from 'cors'

const startServer = async () => {
  try {
    AWS.config.update({
      accessKeyId: config.s3Browser.accessKeyId,
      secretAccessKey: config.s3Browser.secretAccessKey,
    });
    const s3 = new AWS.S3();

    const app = express();
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    app.use(cors());

    app.use("/posts", postsRoutes(s3)); // Routes
    app.use("/users", usersRoutes(s3)); // Routes
    app.use("/groups", groupsRoutes(s3)); // Routes

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // Replace with your actual frontend URL
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    });
    

    app.listen(config.s3Gate.port, () => {
      console.log(`S3 GATE is running on port ${config.s3Gate.port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

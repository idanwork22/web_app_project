import express from 'express';
import userRoutes from './routes/userRoutes';
import config from './config/config';


const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRoutes); // Routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Replace with your actual frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(config.manager.port, () => {
  console.log(`MANAGER is running on port ${config.manager.port}`);
});

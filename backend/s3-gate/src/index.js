import express from 'express';
import postsRoutes from './routes/postsRoutes';
import usersRoutes from './routes/usersRouter';
import config from './config/config';

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));


app.use('/posts', postsRoutes); // Routes
app.use('/users', usersRoutes); // Routes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Replace with your actual frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.listen(config.s3Gate.port, () => {
  console.log(`S3 GATE is running on port ${config.s3Gate.port}`);
});

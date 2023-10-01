import express from 'express';

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Replace with your actual frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 8080; // Check if there environment variables

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

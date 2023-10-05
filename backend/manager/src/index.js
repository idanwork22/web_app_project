import express from 'express';
import userRoutes from './routes/userRoutes';
import config from './config/config';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yml'));
const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/users', userRoutes); // Routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://${config.manager.host}:${config.manager.port}`); // Replace with your actual frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(config.manager.port, () => {
  console.log(`MANAGER is running on port ${config.manager.port}`);
});

import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRouter';
import groupRoutes from './routes/groupRouter';
import config from './config/config';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path';
import cors from 'cors'

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yml'));
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/users', userRoutes); // Routes
app.use('/posts', postRoutes); // Routes
app.use('/groups', groupRoutes); // Routes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://${config.manager.host}:${config.manager.port}`); // Replace with your actual frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(config.manager.port, () => {
  console.log(`MANAGER is running on port ${config.manager.port}`);
});

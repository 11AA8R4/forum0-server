// server
import express from 'express';
import cors from 'cors';
import routes from './routes';

//importing our database
import '../database/index'

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  async middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

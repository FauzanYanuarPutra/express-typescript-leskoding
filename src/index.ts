import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import UserRouter from './routers/UserRoutes'
import { config as dotenv } from 'dotenv'

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).send('Hello World! Ini adalah API')
    })

    this.app.use('/api/v1/users', UserRouter)
  }
}

const app = new App().app;
const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(process.env.DB_HOST)
})
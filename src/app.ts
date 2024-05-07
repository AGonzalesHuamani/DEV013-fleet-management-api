import express, { Application, Request, Response } from 'express';
import router from './routes/taxis_routes';
//swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swaggerOption'


const app: Application = express();


// middleware para parsear el body de las request
app.use(express.json());

const specs = swaggerJSDoc(options)
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(specs))

//rutas declaradas
app.use(router);

// app.use('/', (req: Request, res: Response): void => {
//     res.send('Hello world!');
// });
export default app;
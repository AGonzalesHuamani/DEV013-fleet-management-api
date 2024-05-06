import express, { Application, Request, Response } from 'express';
import router from './routes/taxis_routes';
//swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swaggerOption'


const app: Application = express();
const PORT: number = 3001;

// middleware para parsear el body de las request
app.use(express.json());

const specs = swaggerJSDoc(options)
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(specs))

//rutas declaradas
app.use(router);

// app.use('/', (req: Request, res: Response): void => {
//     res.send('Hello world!');
// });

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

export default app;
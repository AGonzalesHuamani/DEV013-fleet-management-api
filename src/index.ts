import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();

const PORT: number = 3001;

app.use(express.json());


app.use("/documentation", swaggerUi.serve)
app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
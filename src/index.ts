import app from './app'

const PORT: number = 3001;

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

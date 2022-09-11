import app from './src/app';

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

server.on('error', console.error);


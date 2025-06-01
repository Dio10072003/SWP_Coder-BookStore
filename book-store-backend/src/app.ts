import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/books', bookRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
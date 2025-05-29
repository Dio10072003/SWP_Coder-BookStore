import { Router } from 'express';
import BookController from '../controllers/bookController';

const router = Router();
const bookController = new BookController();

export function setRoutes(app: Router) {
    app.get('/books', bookController.getAllBooks.bind(bookController));
    app.get('/books/:id', bookController.getBookById.bind(bookController));
    app.post('/books', bookController.createBook.bind(bookController));
    app.put('/books/:id', bookController.updateBook.bind(bookController));
    app.delete('/books/:id', bookController.deleteBook.bind(bookController));
}
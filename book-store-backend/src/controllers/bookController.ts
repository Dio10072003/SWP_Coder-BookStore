import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/book";

export class BookController {
  private bookService = new BookService();

  private handleError(
    res: Response,
    message: string,
    error?: any,
    status = 500
  ) {
    res.status(status).json({ message, error: error?.message });
  }

  public async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.fetchAllBooks();
      res.status(200).json(books);
    } catch (error) {
      this.handleError(res, "Error retrieving books", error);
    }
  }

  public async getBookById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id)
      return this.handleError(res, "Book ID is required", undefined, 400);
    try {
      const book = await this.bookService.fetchBookById(Number(id));
      if (book) res.status(200).json(book);
      else this.handleError(res, "Book not found", undefined, 404);
    } catch (error) {
      this.handleError(res, "Error retrieving book", error);
    }
  }

  public async createBook(req: Request, res: Response): Promise<void> {
    const { title, author, genre, year } = req.body;
    if (!title || !author || !genre || !year || isNaN(Number(year)))
      return this.handleError(res, "Invalid book data", undefined, 400);
    try {
      const createdBook = await this.bookService.addBook(
        title,
        author,
        genre,
        Number(year)
      );
      res.status(201).json(createdBook);
    } catch (error) {
      this.handleError(res, "Error creating book", error);
    }
  }

  public async updateBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, author, genre, year } = req.body;
    if (!id)
      return this.handleError(res, "Book ID is required", undefined, 400);
    if (!title || !author || !genre || !year || isNaN(Number(year)))
      return this.handleError(res, "Invalid book data", undefined, 400);
    try {
      const updatedBook = await this.bookService.modifyBook(Number(id), {
        title,
        author,
        genre,
        year: Number(year),
      } as Partial<Book>);
      if (updatedBook) res.status(200).json(updatedBook);
      else this.handleError(res, "Book not found", undefined, 404);
    } catch (error) {
      this.handleError(res, "Error updating book", error);
    }
  }

  public async deleteBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id)
      return this.handleError(res, "Book ID is required", undefined, 400);
    try {
      const success = await this.bookService.removeBook(Number(id));
      if (success) res.status(204).send();
      else this.handleError(res, "Book not found", undefined, 404);
    } catch (error) {
      this.handleError(res, "Error deleting book", error);
    }
  }
}

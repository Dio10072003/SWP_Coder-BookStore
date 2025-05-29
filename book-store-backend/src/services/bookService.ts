export class BookService {
    private books: Array<{ id: number; title: string; author: string; genre: string; price: number }> = [];
    private currentId: number = 1;

    fetchAllBooks() {
        return this.books;
    }

    fetchBookById(id: number) {
        return this.books.find(book => book.id === id);
    }

    addBook(title: string, author: string, genre: string, price: number) {
        const newBook = { id: this.currentId++, title, author, genre, price };
        this.books.push(newBook);
        return newBook;
    }

    modifyBook(id: number, updatedData: Partial<{ title: string; author: string; genre: string; price: number }>) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) return null;

        this.books[bookIndex] = { ...this.books[bookIndex], ...updatedData };
        return this.books[bookIndex];
    }

    removeBook(id: number) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) return null;

        const deletedBook = this.books.splice(bookIndex, 1);
        return deletedBook[0];
    }
}
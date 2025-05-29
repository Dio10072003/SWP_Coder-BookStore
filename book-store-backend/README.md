# Book Store Backend

This is a simple backend application for a book store, built using TypeScript and Express. It provides a RESTful API for managing books in the store.

## Project Structure

```
book-store-backend
├── src
│   ├── controllers          # Contains the controllers for handling requests
│   │   └── bookController.ts
│   ├── models               # Contains the data models
│   │   └── book.ts
│   ├── routes               # Contains the route definitions
│   │   └── bookRoutes.ts
│   ├── services             # Contains the business logic
│   │   └── bookService.ts
│   ├── app.ts               # Entry point of the application
│   └── types                # Contains TypeScript types and interfaces
│       └── index.ts
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd book-store-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints

### Books

- **GET /books**: Retrieve all books
- **GET /books/:id**: Retrieve a book by ID
- **POST /books**: Create a new book
- **PUT /books/:id**: Update a book by ID
- **DELETE /books/:id**: Delete a book by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
# Frontend - Next.js App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

API routes can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in pages/api/hello.js.

The pages/api directory is mapped to /api/*. Files in this directory are treated as API routes instead of React pages.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

Backend - Book Store API
This is a simple backend application for a book store, built using TypeScript and Express. It provides a RESTful API for managing books in the store.

Project Structure
graphql
Sao chép
Chỉnh sửa
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
Installation
Clone the repository:

bash
Sao chép
Chỉnh sửa
git clone <repository-url>
Navigate to the project directory:

bash
Sao chép
Chỉnh sửa
cd book-store-backend
Install the dependencies:

nginx
Sao chép
Chỉnh sửa
npm install
Usage
Start the application:

sql
Sao chép
Chỉnh sửa
npm start
The API will be available at http://localhost:3000.

API Endpoints
Books
GET /books: Retrieve all books

GET /books/:id: Retrieve a book by ID

POST /books: Create a new book

PUT /books/:id: Update a book by ID

DELETE /books/:id: Delete a book by ID

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License.
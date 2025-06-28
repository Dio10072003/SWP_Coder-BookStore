const books = [
  {
    id: 1,
    title: "Code Mastery: Advanced Techniques",
    author: "Jane Doe",
    price: "99.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/41w7mJ0Oj-L._SX258_BO1,204,203,200_.jpg",
    rating: 4.5,
    description: "Advanced programming techniques for experienced developers. Learn advanced patterns, optimization strategies, and best practices for building scalable applications.",
    category: "Programming",
    publishYear: 2023,
    pages: 450,
    language: "English",
    isbn: "978-0123456789"
  },
  {
    id: 2,
    title: "The Art of Clean Code",
    author: "John Smith",
    price: "125.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
    rating: 4.8,
    description: "Learn to write clean, maintainable code that other developers will love to work with. Covers SOLID principles, design patterns, and refactoring techniques.",
    category: "Programming",
    publishYear: 2022,
    pages: 380,
    language: "English",
    isbn: "978-0123456790"
  },
  {
    id: 3,
    title: "Beyond the Code: Software Architecture",
    author: "Alex Brown",
    price: "150.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51LnQxpLsuL._SX379_BO1,204,203,200_.jpg",
    rating: 4.2,
    description: "Master software architecture principles and learn how to design scalable, maintainable systems. Covers microservices, cloud architecture, and system design.",
    category: "Architecture",
    publishYear: 2023,
    pages: 520,
    language: "English",
    isbn: "978-0123456791"
  },
  {
    id: 4,
    title: "Mastering JavaScript ES6+",
    author: "Emily White",
    price: "110.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/41N5hdRcw6L._SX258_BO1,204,203,200_.jpg",
    rating: 4.7,
    description: "Complete guide to modern JavaScript including ES6+ features, async/await, modules, and advanced patterns for building robust web applications.",
    category: "Programming",
    publishYear: 2022,
    pages: 420,
    language: "English",
    isbn: "978-0123456792"
  },
  {
    id: 5,
    title: "Python for Data Science",
    author: "David Green",
    price: "180.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX379_BO1,204,203,200_.jpg",
    rating: 4.9,
    description: "Comprehensive guide to data science with Python. Covers pandas, numpy, matplotlib, scikit-learn, and machine learning fundamentals.",
    category: "Data Science",
    publishYear: 2023,
    pages: 580,
    language: "English",
    isbn: "978-0123456793"
  },
  {
    id: 6,
    title: "Designing User Interfaces",
    author: "Sophia Lee",
    price: "135.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/41fnWzYPvFL._SX331_BO1,204,203,200_.jpg",
    rating: 4.6,
    description: "UI/UX design principles and practices for creating intuitive, accessible, and beautiful user interfaces. Includes case studies and practical examples.",
    category: "Design",
    publishYear: 2022,
    pages: 320,
    language: "English",
    isbn: "978-0123456794"
  },
  {
    id: 7,
    title: "React Deep Dive",
    author: "Michael Chen",
    price: "145.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51YxwYcQ4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.7,
    description: "Advanced React concepts including hooks, context, performance optimization, testing, and building production-ready applications.",
    category: "Programming",
    publishYear: 2023,
    pages: 480,
    language: "English",
    isbn: "978-0123456795"
  },
  {
    id: 8,
    title: "Machine Learning Fundamentals",
    author: "Sarah Johnson",
    price: "200.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51K8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.8,
    description: "Introduction to machine learning algorithms, neural networks, deep learning, and practical applications in real-world scenarios.",
    category: "Data Science",
    publishYear: 2023,
    pages: 650,
    language: "English",
    isbn: "978-0123456796"
  },
  {
    id: 9,
    title: "DevOps Handbook",
    author: "Robert Wilson",
    price: "160.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51L8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.4,
    description: "Complete guide to DevOps practices, CI/CD pipelines, containerization with Docker, Kubernetes, and cloud deployment strategies.",
    category: "DevOps",
    publishYear: 2022,
    pages: 440,
    language: "English",
    isbn: "978-0123456797"
  },
  {
    id: 10,
    title: "Web Security Essentials",
    author: "Lisa Anderson",
    price: "120.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51M8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.5,
    description: "Essential web security concepts including OWASP Top 10, authentication, authorization, encryption, and secure coding practices.",
    category: "Security",
    publishYear: 2023,
    pages: 360,
    language: "English",
    isbn: "978-0123456798"
  },
  {
    id: 11,
    title: "Mobile App Development",
    author: "James Taylor",
    price: "170.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51N8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.3,
    description: "Comprehensive guide to mobile app development for iOS and Android using React Native, Flutter, and native development approaches.",
    category: "Mobile",
    publishYear: 2022,
    pages: 500,
    language: "English",
    isbn: "978-0123456799"
  },
  {
    id: 12,
    title: "Database Design Patterns",
    author: "Maria Garcia",
    price: "140.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51O8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.6,
    description: "Database design patterns, optimization techniques, NoSQL vs SQL, and best practices for building scalable database systems.",
    category: "Database",
    publishYear: 2023,
    pages: 400,
    language: "English",
    isbn: "978-0123456800"
  },
  {
    id: 13,
    title: "Game Development with Unity",
    author: "Tom Harris",
    price: "190.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51P8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.4,
    description: "Learn game development using Unity engine. Covers game mechanics, physics, AI, multiplayer, and publishing to various platforms.",
    category: "Game Development",
    publishYear: 2022,
    pages: 550,
    language: "English",
    isbn: "978-0123456801"
  },
  {
    id: 14,
    title: "Blockchain Development",
    author: "Anna Kim",
    price: "220.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51Q8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.7,
    description: "Introduction to blockchain technology, smart contracts, DeFi, NFTs, and building decentralized applications (DApps).",
    category: "Blockchain",
    publishYear: 2023,
    pages: 480,
    language: "English",
    isbn: "978-0123456802"
  },
  {
    id: 15,
    title: "Cloud Computing Architecture",
    author: "Daniel Martinez",
    price: "180.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51R8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.5,
    description: "Cloud computing fundamentals, AWS, Azure, Google Cloud, serverless architecture, and cloud-native application development.",
    category: "Cloud",
    publishYear: 2023,
    pages: 520,
    language: "English",
    isbn: "978-0123456803"
  },
  {
    id: 16,
    title: "System Design Interview",
    author: "Jennifer Lee",
    price: "160.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51S8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.8,
    description: "Prepare for system design interviews with real-world case studies, scalability patterns, and architectural decision frameworks.",
    category: "Architecture",
    publishYear: 2022,
    pages: 380,
    language: "English",
    isbn: "978-0123456804"
  },
  {
    id: 17,
    title: "API Design Best Practices",
    author: "Chris Thompson",
    price: "130.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51T8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.6,
    description: "Design RESTful APIs, GraphQL, authentication, rate limiting, documentation, and API versioning strategies.",
    category: "Programming",
    publishYear: 2023,
    pages: 340,
    language: "English",
    isbn: "978-0123456805"
  },
  {
    id: 18,
    title: "Testing Strategies",
    author: "Rachel Green",
    price: "115.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51U8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.4,
    description: "Comprehensive testing strategies including unit testing, integration testing, E2E testing, and test-driven development (TDD).",
    category: "Programming",
    publishYear: 2022,
    pages: 300,
    language: "English",
    isbn: "978-0123456806"
  },
  {
    id: 19,
    title: "Performance Optimization",
    author: "Kevin Brown",
    price: "155.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51V8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.7,
    description: "Web performance optimization techniques, Core Web Vitals, caching strategies, and tools for measuring and improving performance.",
    category: "Programming",
    publishYear: 2023,
    pages: 420,
    language: "English",
    isbn: "978-0123456807"
  },
  {
    id: 20,
    title: "Agile Project Management",
    author: "Amanda Wilson",
    price: "125.000đ",
    img: "https://images-na.ssl-images-amazon.com/images/I/51W8Jd5Q4PL._SX258_BO1,204,203,200_.jpg",
    rating: 4.3,
    description: "Agile methodologies, Scrum, Kanban, project planning, team collaboration, and delivering value in software development.",
    category: "Project Management",
    publishYear: 2022,
    pages: 280,
    language: "English",
    isbn: "978-0123456808"
  }
];

// In-memory storage (in production, this would be a database)
let booksData = [...books];

// Helper function to generate new ID
const generateId = () => {
  return Math.max(...booksData.map(book => book.id)) + 1;
};

// Helper function to validate book data
const validateBook = (book: any) => {
  const requiredFields = ['title', 'author', 'price', 'category'];
  for (const field of requiredFields) {
    if (!book[field]) {
      throw new Error(`${field} is required`);
    }
  }
  
  if (book.rating && (book.rating < 0 || book.rating > 5)) {
    throw new Error('Rating must be between 0 and 5');
  }
  
  if (book.publishYear && (book.publishYear < 1900 || book.publishYear > new Date().getFullYear() + 1)) {
    throw new Error('Invalid publish year');
  }
  
  if (book.pages && book.pages <= 0) {
    throw new Error('Pages must be greater than 0');
  }
  
  return true;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    const book = booksData.find(b => b.id === parseInt(id));
    if (!book) {
      return new Response(JSON.stringify({ error: 'Book not found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(book), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const year = searchParams.get('year');
  const minRating = searchParams.get('minRating');
  const maxPrice = searchParams.get('maxPrice');
  
  let filteredBooks = [...booksData];
  
  // Filter by category
  if (category && category !== 'All') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }
  
  // Filter by search
  if (search) {
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Filter by year
  if (year) {
    filteredBooks = filteredBooks.filter(book => book.publishYear === parseInt(year));
  }
  
  // Filter by minimum rating
  if (minRating) {
    filteredBooks = filteredBooks.filter(book => book.rating >= parseFloat(minRating));
  }
  
  // Filter by maximum price
  if (maxPrice) {
    const maxPriceValue = parseFloat(maxPrice.replace(/[^\d]/g, ''));
    filteredBooks = filteredBooks.filter(book => {
      const bookPrice = parseFloat(book.price.replace(/[^\d]/g, ''));
      return bookPrice <= maxPriceValue;
    });
  }
  
  return new Response(JSON.stringify(filteredBooks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// CREATE - Add new book
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate book data
    validateBook(body);
    
    // Create new book with generated ID
    const newBook = {
      id: generateId(),
      title: body.title,
      author: body.author,
      price: body.price,
      img: body.img || "https://placehold.co/300x400?text=No+Image",
      rating: body.rating || 0,
      description: body.description || "",
      category: body.category,
      publishYear: body.publishYear || new Date().getFullYear(),
      pages: body.pages || 0,
      language: body.language || "English",
      isbn: body.isbn || `978-${Math.random().toString().slice(2, 12)}`
    };
    
    // Add to data
    booksData.push(newBook);
    
    return new Response(JSON.stringify(newBook), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid book data' }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// UPDATE - Update existing book
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Book ID is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const bookId = parseInt(id);
    const bookIndex = booksData.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
      return new Response(JSON.stringify({ error: 'Book not found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const body = await request.json();
    
    // Validate book data
    validateBook(body);
    
    // Update book
    const updatedBook = {
      ...booksData[bookIndex],
      ...body,
      id: bookId // Ensure ID doesn't change
    };
    
    booksData[bookIndex] = updatedBook;
    
    return new Response(JSON.stringify(updatedBook), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid book data' }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE - Delete book
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Book ID is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const bookId = parseInt(id);
    const bookIndex = booksData.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
      return new Response(JSON.stringify({ error: 'Book not found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Remove book from data
    const deletedBook = booksData.splice(bookIndex, 1)[0];
    
    return new Response(JSON.stringify({ message: 'Book deleted successfully', book: deletedBook }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete book' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

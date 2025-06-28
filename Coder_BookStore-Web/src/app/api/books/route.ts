const bookTitles = [
  "Clean Code", "The Pragmatic Programmer", "Refactoring", "Design Patterns", "You Don't Know JS", "Eloquent JavaScript", "Python Crash Course", "Automate the Boring Stuff", "Fluent Python", "Deep Learning with Python", "Grokking Algorithms", "Introduction to Algorithms", "Cracking the Coding Interview", "The Art of Computer Programming", "JavaScript: The Good Parts", "Effective Java", "Head First Design Patterns", "Learning React", "React Up & Running", "Pro Git", "The Mythical Man-Month", "Continuous Delivery", "Site Reliability Engineering", "The Phoenix Project", "The DevOps Handbook", "Soft Skills", "The Clean Coder", "Working Effectively with Legacy Code", "Test-Driven Development", "Extreme Programming Explained", "Code Complete", "Structure and Interpretation of Computer Programs", "Programming Pearls", "Algorithms", "Compilers: Principles, Techniques, and Tools", "Introduction to the Theory of Computation", "Artificial Intelligence: A Modern Approach", "Hands-On Machine Learning", "Deep Learning", "Data Science from Scratch", "Data Structures and Algorithms in Python", "Database System Concepts", "SQL Antipatterns", "NoSQL Distilled", "MongoDB: The Definitive Guide", "Learning SQL", "Head First SQL", "Kubernetes Up & Running", "Docker Deep Dive", "Cloud Native DevOps with Kubernetes", "AWS Certified Solutions Architect", "Azure for Architects", "Google Cloud Platform for Architects", "Blockchain Basics", "Mastering Bitcoin", "Mastering Ethereum", "Building Microservices", "Microservices Patterns", "RESTful Web APIs", "API Design Patterns", "Web Security for Developers", "Hacking: The Art of Exploitation", "The Web Application Hacker's Handbook", "Network Security Essentials", "Linux Basics for Hackers", "The Linux Command Line", "UNIX and Linux System Administration Handbook", "Operating System Concepts", "Computer Networking: A Top-Down Approach", "TCP/IP Illustrated", "CompTIA Network+ Guide", "CCNA Routing and Switching", "Game Programming Patterns", "Unity in Action", "Unreal Engine 4.x Scripting", "Game Engine Architecture", "Game Design Workshop", "The Art of Game Design", "Mobile App Development with React Native", "Android Programming", "iOS Programming", "Swift Programming: The Big Nerd Ranch Guide", "Flutter for Beginners", "Beginning iOS Programming", "Agile Estimating and Planning", "Scrum: The Art of Doing Twice the Work", "Kanban: Successful Evolutionary Change", "Project Management for the Unofficial Project Manager", "Lean Software Development", "The Lean Startup", "UX for Beginners", "Don't Make Me Think", "The Design of Everyday Things", "About Face: The Essentials of Interaction Design", "Sprint: How to Solve Big Problems", "Hooked: How to Build Habit-Forming Products"
];
const authorNames = [
  "Robert C. Martin", "Andrew Hunt", "Martin Fowler", "Erich Gamma", "Kyle Simpson", "Marijn Haverbeke", "Eric Matthes", "Al Sweigart", "Luciano Ramalho", "Francois Chollet", "Aditya Bhargava", "Thomas H. Cormen", "Gayle Laakmann McDowell", "Donald Knuth", "Douglas Crockford", "Joshua Bloch", "Eric Freeman", "Alex Banks", "Stoyan Stefanov", "Scott Chacon", "Frederick P. Brooks Jr.", "Jez Humble", "Betsy Beyer", "Gene Kim", "Jez Humble", "John Sonmez", "Robert C. Martin", "Michael Feathers", "Kent Beck", "Kent Beck", "Steve McConnell", "Harold Abelson", "Jon Bentley", "Robert Sedgewick", "Alfred V. Aho", "Michael Sipser", "Stuart Russell", "Aurélien Géron", "Ian Goodfellow", "Joel Grus", "Michael T. Goodrich", "Abraham Silberschatz", "Bill Karwin", "Pramod J. Sadalage", "Kristina Chodorow", "Alan Beaulieu", "Paul DuBois", "Kelsey Hightower", "Nigel Poulton", "John Arundel", "Ben Piper", "Haishi Bai", "Dan Sullivan", "Daniel Drescher", "Andreas M. Antonopoulos", "Andreas M. Antonopoulos", "Sam Newman", "Chris Richardson", "Leonard Richardson", "Bruno Pedro", "Malcolm McDonald", "Jon Erickson", "Marcus Pinto", "William Stallings", "OccupyTheWeb", "William Shotts", "Evi Nemeth", "Abraham Silberschatz", "James F. Kurose", "W. Richard Stevens", "Mike Meyers", "Todd Lammle", "Robert Nystrom", "Joe Hocking", "Joanna Lee", "Jason Gregory", "Tracy Fullerton", "Jesse Schell", "Bonnie Eisenman", "Bill Phillips", "Christian Keur", "Matthew Mathias", "Alessandro Biessek", "Ahmad Sahar", "Mike Cohn", "Jeff Sutherland", "David J. Anderson", "Kory Kogon", "Mary Poppendieck", "Eric Ries", "Joel Marsh", "Steve Krug", "Don Norman", "Alan Cooper", "Jake Knapp", "Nir Eyal"
];
const categories = [
  "Programming", "Data Science", "Design", "Architecture", "Security", "Mobile", "Database", "Game Development", "Blockchain", "Cloud", "Project Management", "UI/UX", "Web Development", "AI/ML", "DevOps"
];
const languages = ["English", "Vietnamese", "French", "German", "Japanese", "Spanish"];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max, decimals = 1) {
  return +(Math.random() * (max - min) + min).toFixed(decimals);
}
function randomPick(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

const books = Array.from({ length: 100 }, (_, i) => {
  const title = bookTitles[i % bookTitles.length] + (i >= bookTitles.length ? ` Vol. ${Math.floor(i / bookTitles.length) + 1}` : '');
  const author = randomPick(authorNames);
  const category = randomPick(categories);
  const publishYear = randomInt(2005, 2024);
  const pages = randomInt(180, 900);
  const language = randomPick(languages);
  const rating = randomFloat(3.2, 5.0);
  const price = `${randomInt(80000, 350000).toLocaleString('vi-VN')}đ`;
  const isbn = `978-${randomInt(1000000000, 9999999999)}`;
  const img = `https://covers.openlibrary.org/b/id/${randomInt(1000000, 1100000)}-L.jpg`;
  const description = `"${title}" là một cuốn sách ${category.toLowerCase()} xuất bản năm ${publishYear}, gồm ${pages} trang, được viết bởi ${author}. Sách cung cấp kiến thức thực tiễn, ví dụ minh họa và hướng dẫn chi tiết cho người đọc quan tâm đến lĩnh vực này.`;
  return {
    id: i + 1,
    title,
    author,
    price,
    img,
    rating,
    description,
    category,
    publishYear,
    pages,
    language,
    isbn
  };
});

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
  
  // Phân trang thực
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const start = (page - 1) * limit;
  const end = start + limit;
  const pagedBooks = filteredBooks.slice(start, end);
  return new Response(JSON.stringify({ data: pagedBooks, total: filteredBooks.length }), {
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

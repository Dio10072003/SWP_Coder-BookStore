import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

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

// GET /api/books - List or get single book
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Lấy chi tiết 1 book
    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  // Lọc, phân trang
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const year = searchParams.get('year');
  const minRating = searchParams.get('minRating');
  const maxPrice = searchParams.get('maxPrice');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseAdmin.from('books').select('*', { count: 'exact' });
  if (category && category !== 'All') query = query.eq('category', category);
  if (search) query = query.ilike('title', `%${search}%`);
  if (year) query = query.eq('publishYear', parseInt(year));
  if (minRating) query = query.gte('rating', parseFloat(minRating));
  if (maxPrice) query = query.lte('price', parseFloat(maxPrice));
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, total: count });
}

// POST /api/books - Create new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, author, price, img, rating, description, category,
      publishYear, pages, language, isbn
    } = body;
    if (!title || !author || !price || !category) {
      return NextResponse.json({ error: 'Thiếu trường bắt buộc' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from('books')
      .insert([{ title, author, price, img, rating, description, category, publishYear, pages, language, isbn }])
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/books?id=... - Update book
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('books')
      .update(body)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/books?id=... - Delete book
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin
    .from('books')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'Book deleted successfully' });
}

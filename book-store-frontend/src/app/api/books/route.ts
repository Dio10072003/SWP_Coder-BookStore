const books = [
  {
    id: 1,
    title: "Code Mastery: Advanced Techniques",
    author: "Jane Doe",
    price: "99.000đ",
  },
  {
    id: 2,
    title: "The Art of Clean Code",
    author: "John Smith",
    price: "125.000đ",
  },
  {
    id: 3,
    title: "Beyond the Code: Software Architecture",
    author: "Alex Brown",
    price: "150.000đ",
  },
  {
    id: 4,
    title: "Mastering JavaScript ES6+",
    author: "Emily White",
    price: "110.000đ",
  },
  {
    id: 5,
    title: "Python for Data Science",
    author: "David Green",
    price: "180.000đ",
  },
  {
    id: 6,
    title: "Designing User Interfaces",
    author: "Sophia Lee",
    price: "135.000đ",
  },
];

export async function GET(request) {
  return new Response(JSON.stringify(books), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

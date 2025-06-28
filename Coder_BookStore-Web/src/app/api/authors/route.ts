const authors = [
  {
    id: 1,
    name: "Jane Doe",
    bio: "Jane Doe là tác giả nổi tiếng về lập trình và phát triển phần mềm, từng đạt nhiều giải thưởng quốc tế.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    books: [1, 5, 7],
    country: "USA",
    birthYear: 1980,
    genres: ["Programming", "Data Science"]
  },
  {
    id: 2,
    name: "John Smith",
    bio: "John Smith chuyên về clean code, kiến trúc phần mềm và giảng dạy lập trình cho cộng đồng quốc tế.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    books: [2, 3, 8],
    country: "UK",
    birthYear: 1975,
    genres: ["Programming", "Architecture"]
  },
  {
    id: 3,
    name: "Emily White",
    bio: "Emily là chuyên gia về JavaScript, React và phát triển web hiện đại.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    books: [4, 7],
    country: "Canada",
    birthYear: 1988,
    genres: ["Programming", "Web Development"]
  },
  {
    id: 4,
    name: "David Green",
    bio: "David là nhà khoa học dữ liệu, tác giả nhiều sách về Python và Machine Learning.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    books: [5, 8],
    country: "Australia",
    birthYear: 1982,
    genres: ["Data Science", "Machine Learning"]
  },
  {
    id: 5,
    name: "Sophia Lee",
    bio: "Chuyên gia UI/UX, Sophia đã thiết kế cho nhiều sản phẩm nổi tiếng toàn cầu.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    books: [6],
    country: "Korea",
    birthYear: 1990,
    genres: ["Design", "UI/UX"]
  }
];

let authorsData = [...authors];

const generateId = () => Math.max(...authorsData.map(a => a.id)) + 1;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const author = authorsData.find(a => a.id === parseInt(id));
    if (!author) {
      return new Response(JSON.stringify({ error: 'Author not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify(author), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  // Filter by name
  const name = searchParams.get('name');
  let filtered = [...authorsData];
  if (name) {
    filtered = filtered.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
  }
  return new Response(JSON.stringify(filtered), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) throw new Error('Name is required');
    const newAuthor = { ...body, id: generateId() };
    authorsData.push(newAuthor);
    return new Response(JSON.stringify(newAuthor), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid author data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('Author ID is required');
    const idx = authorsData.findIndex(a => a.id === parseInt(id));
    if (idx === -1) throw new Error('Author not found');
    const body = await request.json();
    authorsData[idx] = { ...authorsData[idx], ...body, id: parseInt(id) };
    return new Response(JSON.stringify(authorsData[idx]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid author data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('Author ID is required');
    const idx = authorsData.findIndex(a => a.id === parseInt(id));
    if (idx === -1) throw new Error('Author not found');
    const deleted = authorsData.splice(idx, 1)[0];
    return new Response(JSON.stringify({ message: 'Author deleted', author: deleted }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to delete author' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
} 
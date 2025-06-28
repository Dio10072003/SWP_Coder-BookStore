const categories = [
  { id: 1, name: "Programming", description: "Sách về lập trình, ngôn ngữ, framework, best practices." },
  { id: 2, name: "Data Science", description: "Sách về khoa học dữ liệu, AI, Machine Learning, Big Data." },
  { id: 3, name: "Design", description: "UI/UX, thiết kế đồ họa, thiết kế sản phẩm số." },
  { id: 4, name: "Architecture", description: "Kiến trúc phần mềm, system design, cloud, microservices." },
  { id: 5, name: "Security", description: "An ninh mạng, bảo mật ứng dụng, mã hóa, OWASP." },
  { id: 6, name: "Mobile", description: "Phát triển ứng dụng di động, iOS, Android, cross-platform." },
  { id: 7, name: "Database", description: "Cơ sở dữ liệu, NoSQL, SQL, tối ưu hóa truy vấn." },
  { id: 8, name: "Game Development", description: "Lập trình game, Unity, Unreal, thiết kế gameplay." },
  { id: 9, name: "Blockchain", description: "Blockchain, smart contract, DeFi, NFT, DApp." },
  { id: 10, name: "Cloud", description: "Điện toán đám mây, AWS, Azure, Google Cloud, serverless." },
  { id: 11, name: "Project Management", description: "Quản lý dự án, Agile, Scrum, Kanban, teamwork." }
];

let categoriesData = [...categories];

const generateId = () => Math.max(...categoriesData.map(c => c.id)) + 1;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const category = categoriesData.find(c => c.id === parseInt(id));
    if (!category) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify(category), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  // Filter by name
  const name = searchParams.get('name');
  let filtered = [...categoriesData];
  if (name) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  }
  return new Response(JSON.stringify(filtered), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) throw new Error('Name is required');
    const newCategory = { ...body, id: generateId() };
    categoriesData.push(newCategory);
    return new Response(JSON.stringify(newCategory), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid category data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('Category ID is required');
    const idx = categoriesData.findIndex(c => c.id === parseInt(id));
    if (idx === -1) throw new Error('Category not found');
    const body = await request.json();
    categoriesData[idx] = { ...categoriesData[idx], ...body, id: parseInt(id) };
    return new Response(JSON.stringify(categoriesData[idx]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid category data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('Category ID is required');
    const idx = categoriesData.findIndex(c => c.id === parseInt(id));
    if (idx === -1) throw new Error('Category not found');
    const deleted = categoriesData.splice(idx, 1)[0];
    return new Response(JSON.stringify({ message: 'Category deleted', category: deleted }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to delete category' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
} 
const bcrypt = require('bcryptjs');

const users = [
  { email: 'alice@example.com', name: 'Alice Nguyen', role: 'Admin', password: 'alice123' },
  { email: 'bob@example.com', name: 'Bob Tran', role: 'Staff', password: 'bob123' },
  { email: 'eve@example.com', name: 'Eve Dao', role: 'Staff', password: 'eve123' },
  { email: 'frank@example.com', name: 'Frank Ho', role: 'Staff', password: 'frank123' },
  { email: 'grace@example.com', name: 'Grace Vu', role: 'Staff', password: 'grace123' },
  { email: 'hank@example.com', name: 'Hank Le', role: 'Staff', password: 'hank123' },
  { email: 'carol@example.com', name: 'Carol Le', role: 'User', password: 'carol123' },
  { email: 'david@example.com', name: 'David Pham', role: 'User', password: 'david123' },
  { email: 'ivy@example.com', name: 'Ivy Nguyen', role: 'User', password: 'ivy123' },
  { email: 'jack@example.com', name: 'Jack Tran', role: 'User', password: 'jack123' },
  { email: 'kate@example.com', name: 'Kate Bui', role: 'User', password: 'kate123' },
  { email: 'lucas@example.com', name: 'Lucas Phan', role: 'User', password: 'lucas123' },
];

(async () => {
  for (const user of users) {
    user.passwordHash = await bcrypt.hash(user.password, 10);
  }
  console.log('-- Chèn dữ liệu mẫu vào bảng users');
  console.log('INSERT INTO public.users (email, name, role, password, passwordHash) VALUES');
  users.forEach((u, i) => {
    const line = `('${u.email}', '${u.name}', '${u.role}', '${u.password}', '${u.passwordHash}')${i === users.length - 1 ? ';' : ','}`;
    console.log(line);
  });
})(); 
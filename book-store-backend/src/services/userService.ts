import { User } from "../models/user";
import bcrypt from "bcrypt";

export class UserService {
  private users: User[] = [];
  private nextId = 1;

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  public async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser: User = {
      id: this.nextId++,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.users.push(newUser);
    return newUser;
  }

  public async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
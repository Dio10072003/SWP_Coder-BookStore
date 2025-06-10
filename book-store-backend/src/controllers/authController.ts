import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/userService";

export class AuthController {
  private userService = new UserService();
  private JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

  private handleError(
    res: Response,
    message: string,
    error?: any,
    status = 500
  ) {
    res.status(status).json({ message, error: error?.message });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    
    if (!email || !password) {
      this.handleError(res, "Email and password are required", undefined, 400);
      return;
    }

    try {
      const user = await this.userService.findByEmail(email);
      
      if (!user || !await this.userService.verifyPassword(password, user.password)) {
        this.handleError(res, "Invalid credentials", undefined, 401);
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        this.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      this.handleError(res, "Login failed", error);
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      this.handleError(res, "Name, email and password are required", undefined, 400);
      return;
    }

    try {
      const existingUser = await this.userService.findByEmail(email);
      
      if (existingUser) {
        this.handleError(res, "Email already in use", undefined, 409);
        return;
      }

      const user = await this.userService.createUser(name, email, password);
      
      const token = jwt.sign(
        { id: user.id, email: user.email },
        this.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: "Registration successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      this.handleError(res, "Registration failed", error);
    }
  }

  public logout(_req: Request, res: Response): void {
    // JWT is stateless, so we just return success
    // Client-side should remove the token
    res.status(200).json({ message: "Logout successful" });
  }
}
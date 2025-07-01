export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  content: string
  post_id: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Promotion {
  id: string;
  title: string;
  description?: string;
  discount: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      posts: {
        Row: Post
        Insert: Omit<Post, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>
      }
      comments: {
        Row: Comment
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at'>>
      }
      promotions: {
        Row: Promotion
        Insert: Omit<Promotion, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Promotion, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 
'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  created_at: string
}

interface Post {
  id: string
  title: string
  content: string
  user_id: string
  created_at: string
  users: {
    id: string
    name: string
    email: string
  }
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [newPost, setNewPost] = useState({ title: '', content: '', user_id: '' })

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  // Create user
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      if (response.ok) {
        setNewUser({ name: '', email: '' })
        fetchUsers()
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  // Create post
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
      if (response.ok) {
        setNewPost({ title: '', content: '', user_id: '' })
        fetchPosts()
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchUsers(), fetchPosts()])
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <h1>Next.js + Supabase API Demo</h1>
      
      {/* Create User Form */}
      <section>
        <h2>Create User</h2>
        <form onSubmit={createUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <button type="submit">Create User</button>
        </form>
      </section>

      {/* Create Post Form */}
      <section>
        <h2>Create Post</h2>
        <form onSubmit={createPost}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
          <select
            value={newPost.user_id}
            onChange={(e) => setNewPost({ ...newPost, user_id: e.target.value })}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Create Post</button>
        </form>
      </section>

      {/* Users List */}
      <section>
        <h2>Users ({users.length})</h2>
        <div className="grid">
          {users.map((user) => (
            <div key={user.id} className="card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <small>{new Date(user.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Posts List */}
      <section>
        <h2>Posts ({posts.length})</h2>
        <div className="grid">
          {posts.map((post) => (
            <div key={post.id} className="card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By: {post.users?.name || 'Unknown'}</small>
              <br />
              <small>{new Date(post.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 
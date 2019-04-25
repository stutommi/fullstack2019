const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test.helper')


beforeEach(async () => {
  // Clear database
  await Blog.deleteMany({})
  // Map blog objects into intances of mongoose model
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // Store promises which originate from database storing
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('BLOG', () => {
  describe('RESPONSE', () => {
    test('should return correct amount of blogs in JSON format', async () => {
      const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(helper.initialBlogs.length)
      expect(response.status).toBe(200)
    })

    test('blogs should contain id fields', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('POST', () => {
    test('should add blog to database with correct information', async () => {
      const newBlog = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
        likes: 4
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfterPost = await helper.blogsInDb()
      expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1)

      const authors = blogsAfterPost.map(b => b.author)
      expect(authors).toContain('test-author')
    })

    test('likes are saved as 0 if no value is given', async () => {
      const newBlog = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url'
      }

      const response = await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBeDefined()
      console.log(response.body)
    })

    test('with no title or author are responded with 400', async () => {
      const newBlog = {
        likes: 4,
        url: 'test-url'
      }

      await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('DELETE', () => {
    test('should delete a single blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    })

  })

  describe('PUT', () => {
    test('should update existing blog likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const blog = {
        ...blogToUpdate,
        likes: 45
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blog)
        .expect(200, { ...blog, id: `${blog.id}` })
        .expect('Content-Type', /application\/json/)
    })

  })

})

describe('USERS', () => {
  beforeEach(async () => {
    await helper.cleanAndMountFiveUsers()
  })
  describe('GET', () => {
    test('should return all users in JSON-format', async () => {
      const users = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(helper.initialUsers.length).toBe(users.body.length)
    })
  })
  describe('POST', () => {
    beforeEach(async () => {
      await helper.cleanAndMountFiveUsers()
    })
    test('should succeed with valid request', async () => {
      const newUser = {
        username: 'Joanne',
        name: 'Joanne Livingston',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const users = await User.find({})

      expect(helper.initialUsers.length).toBe(users.length - 1)

    })

    test('should fail when username.length < 3', async () => {
      const newUser = {
        username: 'Jo',
        name: 'Joanne Livingston',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const users = await User.find({})

      expect(helper.initialUsers.length).toBe(users.length)

    })

    test('should fail when password.length < 3', async () => {
      const newUser = {
        username: 'Joanne',
        name: 'Joanne Livingston',
        password: 'pa'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const users = await User.find({})

      expect(helper.initialUsers.length).toBe(users.length)

    })

    test('should fail when username already exists', async () => {
      const newUser = {
        username: 'testUsername1',
        name: 'Joanne Livingston',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const users = await User.find({})

      expect(helper.initialUsers.length).toBe(users.length)

    })

  })

})

afterAll(() => {
  mongoose.connection.close()
})
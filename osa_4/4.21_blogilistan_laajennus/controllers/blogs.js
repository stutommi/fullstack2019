const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs.map(b => b.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = req.token
  console.log(token)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      author: body.author,
      title: body.title,
      likes: body.likes,
      url: body.url,
      user: user._id

    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()
    res.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(req.params.id)

    if (decodedToken.id !== blog.user._id.toString()) {
      return res.status(401).json({ error: 'deletion of this blog not allowed' })
    }

    
    const user = await User.findById(decodedToken.id)
    console.log(user.blogs[0].toString(), blog._id.toString())
    
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== blog._id.toString())
    await user.save()
    await blog.remove()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedValues = req.body
    const id = req.params.id
    const blog = {
      likes: updatedValues.likes,
      title: updatedValues.title,
      author: updatedValues.author,
      url: updatedValues.url
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    console.log('updatedBlog')

    res.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
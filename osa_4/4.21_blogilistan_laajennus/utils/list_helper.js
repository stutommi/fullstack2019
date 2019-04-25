const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = array => {
  const likesArray = array.map(blog => blog.likes)
  return likesArray.reduce((acc, cur) => acc + cur, 0)
}

const favoriteBlog = array => {
  const mostPopularBlogLikeCount = Math.max(...array.map(blog => blog.likes))
  const blogWithMaxLikes = array.find(blog => blog.likes === mostPopularBlogLikeCount)
  return blogWithMaxLikes
}

const mostBlogs = array => {
  const authors = array.map(blog => blog.author)
  const authorsAndBlogs = _.invert(_.countBy(authors, String.localeCompare))
  const mostBlogs = Math.max(...Object.keys(authorsAndBlogs))

  const mostProductive = {
    author: authorsAndBlogs[mostBlogs],
    blogs: mostBlogs
  }

  return mostProductive
}

const mostLikes = array => {
  let authorLikesObject = {}

  array.forEach(blog => {
    Object.keys(authorLikesObject).includes(blog.author)
      ? authorLikesObject[blog.author] += blog.likes
      : authorLikesObject[blog.author] = blog.likes
  })
  const mostLikes = Math.max(...Object.values(authorLikesObject))
  authorLikesObject = _.invert(authorLikesObject)

  const mostLiked = {
    author: authorLikesObject[mostLikes],
    likes: mostLikes
  }

  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
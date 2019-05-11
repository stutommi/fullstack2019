import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, withRouter
} from 'react-router-dom'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is Link brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal Link truth more general than the brief tale itself,
      such as to characterize Link person by delineating Link specific quirk or trait, to communicate an abstract idea about Link person, place, or thing through the concrete details of Link short narrative.
      An anecdote is "Link story with Link point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <Link href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</Link>.

    See <Link href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</Link> for the source code.
  </div>
)

let CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setNotification(`a new anecdote "${content}" created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000);
    props.history.push('/')
  }

  return (
    <div>
      <h2>create Link new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

CreateNew = withRouter(CreateNew)

const Anecdote = ({ anecdote }) => (
  <>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more information see
      <a href={anecdote.url}>{anecdote.url}</a>
    </p>
  </>
)

const Notification = ({notification}) => <p>{notification}</p>

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(Link => Link.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(Link => Link.id === id ? voted : Link))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        <Route exact path='/' render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path='/anecdotes/:id' render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />
        } />
        <Route path='/create' render={() => <CreateNew addNew={addNew} setNotification={setNotification}/>} />
        <Route path='/about' render={() => <About />} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
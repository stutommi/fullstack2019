import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) =>
    <button onClick={handleClick}> {text}</button>

const VoteDisplay = ({ voteCount }) =>
    <strong><p>has {voteCount} votes</p></strong>

const AnecdoteDisplay = ({ anecdote, voteCount }) => (
    <>
        <h1>Anecdote of the day</h1>
        <p>{anecdote}</p>
        <VoteDisplay voteCount={voteCount} />
    </>
)

const MostVotedAnecdote = ({ anecdote, voteCount }) => {
    if (voteCount === 0) {return <p>no votes</p>}
    
    return (
        <>
            <h1>Anecdote with most votes</h1>
            <p>{anecdote}</p>
            <VoteDisplay voteCount={voteCount} />
        </>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))
    const [mostVotedIndex, setMostVotedIndex] = useState(0)

    // Arrow function for getting a random number, doesn't give same number as previous state
    const getRandomNumber = () => {
        let randomNumber = Math.floor(Math.random() * anecdotes.length)
        randomNumber === selected ? getRandomNumber() : setSelected(randomNumber);
    }

    // Arrow function for setting votes
    const updateVotes = () => {
        const copy = [...votes]
        copy[selected]++
        setVotes(copy)
        setMostVotedIndex(copy.indexOf(Math.max(...copy)))
    }

    return (
        <>
            <AnecdoteDisplay anecdote={anecdotes[selected]} voteCount={votes[selected]} />
            <Button handleClick={getRandomNumber} text='next anecdotes' />
            <Button handleClick={updateVotes} text='vote' />
            <MostVotedAnecdote anecdote={anecdotes[mostVotedIndex]} voteCount={votes[mostVotedIndex]} />
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
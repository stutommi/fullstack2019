import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

// Button component
const Button = ({ text, handleClick }) =>
    <button onClick={handleClick}>{text}</button>

// Average component
const Average = ({ data, total }) => {
    const good = data[0]
    const bad = data[2]
    const invertedBadValue = -bad

    return (
        <tr>
            <td>keskiarvo</td>
            <td>{(good + invertedBadValue) / total}</td>
        </tr>
    )
}

// PositiveFeedback component
const PositiveFeedback = ({ data, total }) =>
    (
        <tr>
            <td>positiivisia</td>
            <td>{(data[0] / total) * 100} %</td>
        </tr>
    )

// TotalFeedback component
const TotalFeedback = ({ total }) => (
    <tr>
        <td>yhteensä</td>
        <td>{total}</td>
    </tr>
)

// Statistic component
const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

// Statistics component (container)
const Statistics = ({ data }) => {
    const [good, neutral, bad] = data
    const total = data.reduce((acc, cur) => acc + cur)

    // Executes if no feedback has been given 
    if (total === 0) {
        return (
            <>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </>
        )
    }

    // Executes if feedback has been given
    return (
        <>
            <h1>Statistiikka</h1>
            <table>
                <tbody>
                    <Statistic text="hyvä" value={good} />
                    <Statistic text="neutraali" value={neutral} />
                    <Statistic text="huono" value={bad} />
                    <TotalFeedback total={total} />
                    <Average data={data} total={total} />
                    <PositiveFeedback data={data} total={total} />
                </tbody>
            </table>

        </>
    )
}

// Root Component
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => setGood(good + 1)
    const addNeutral = () => setNeutral(neutral + 1)
    const addBad = () => setBad(bad + 1)

    return (
        <>
            <h1>anna palautetta</h1>
            <Button text="hyvä" handleClick={addGood} />
            <Button text="neutraali" handleClick={addNeutral} />
            <Button text="huono" handleClick={addBad} />
            <Statistics data={[good, neutral, bad]} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
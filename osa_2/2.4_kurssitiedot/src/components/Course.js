import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = ({ parts }) => {
    const renderParts = () => (
        parts.map(part =>
            <Part
                key={part.name.toString()}
                part={part}
            />
        )
    )

    return renderParts();
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = ({ parts }) => {
    let total = parts.map(value => value.exercises).reduce((acc, cur) => acc + cur)

    return (
        <p>
            yhteensä {total} tehtävää
        </p>
    )
}

const Course = ({ course }) => (
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course
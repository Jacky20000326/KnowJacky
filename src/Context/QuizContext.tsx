import React, { createContext, useState } from 'react'

interface QuizType {
    score: number
    setScore: React.Dispatch<React.SetStateAction<number>>
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}
interface Props {
    children: React.ReactNode
}

export const QuizContextProp = createContext<QuizType>({} as QuizType)

const QuizContext = (props: Props) => {
    let [score, setScore] = useState(0)
    let [count, setCount] = useState(1)
    return (
        <QuizContextProp.Provider value={{ score, setScore, count, setCount }}>
            {props.children}
        </QuizContextProp.Provider>
    )
}

export default QuizContext









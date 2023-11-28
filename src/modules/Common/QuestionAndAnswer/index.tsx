import useBoolean from "hooks/useBoolean"
import { FC, ReactNode } from "react"

type QuestionAndAnswerProps = {
    id?: string
    question: ReactNode
    answer: ReactNode
}

const QuestionAndAnswer: FC<QuestionAndAnswerProps> = ({ id, question, answer }) => {
    const [expand, setExpand] = useBoolean(false)

    return (
        <div
            id={id}
            className="border rounded-xl shadow px-6 py-3"
        >
            <div
                className="flex space-x-2 overflow-hidden hover:text-main-primary cursor-pointer transition-colors"
                onClick={setExpand.toggle}
            >
                <div className="grow font-medium text-lg overflow-x-hidden">
                    {question}
                </div>
                <button
                    type="button"
                    aria-expanded={expand}
                    className="self-start py-0.5 aria-expanded:rotate-180 transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>

            <div
                aria-expanded={expand}
                className="expand-wrapper"
            >
                <div
                    aria-expanded={expand}
                    className="overflow-hidden">
                    {answer}
                </div>
            </div>
        </div>
    )
}

export default QuestionAndAnswer
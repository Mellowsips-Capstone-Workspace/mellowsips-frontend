import { Component, ReactNode } from "react"

type ErrorBoundaryProps = {
    fallback?: ReactNode
    children?: ReactNode
}

type ErrorBoundaryState = {
    error: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { error: false }
    }

    static getDerivedStateFromError() {
        return { error: true }
    }

    componentDidCatch(error: Error) {
        console.warn("Name: ", error.name)
        console.warn("Stack: ", error.stack)
    }

    render() {

        const { children, fallback } = this.props
        const { error } = this.state

        if (!error) {
            return children
        }

        if (fallback) {
            return fallback
        }

        return (
            <div className="w-fit mx-auto">

                <p className="text-center">Sự cố bất thường.</p>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/11329/11329116.png"
                    alt=""
                    className="mx-auto pointer-events-none select-none"
                />
                <p className="text-xs italic">Hãy chắc chắn đường truyền internet của bạn ổn định. Vui lòng thử lại sau.</p>
            </div>
        )
    }
}

export default ErrorBoundary

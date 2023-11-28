
import { FC } from "react";
import { Link } from "react-router-dom";

type LogoProps = {
    height: number
    disable?: boolean
}

const LogoFull: FC<LogoProps> = ({ height, disable = false }) => {
    return (
        <Link
            to={"/"}
            aria-disabled={disable}
            className="w-fit h-fit flex items-center space-x-1 hover:text-main-primary transition-colors select-none aria-disabled:pointer-events-none"
        >
            <img
                className="block w-auto mx-auto pointer-events-none"
                style={{ height: height }}
                src="/images/logo.svg"
                alt="Logo"
            />
            <p style={{ fontSize: height, lineHeight: `${height}px` }} className="text-main-primary font-bold pointer-events-none pl-2">Mellow Sips</p>
        </Link>
    )
}

export default LogoFull
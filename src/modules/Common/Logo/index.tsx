
import { FC } from "react";
import { Link } from "react-router-dom";

type LogoProps = {
    logoSize: number
    showName?: boolean
    primary?: boolean
}

const Logo: FC<LogoProps> = ({ logoSize = 36, showName = true, primary = true }) => {
    return (
        <Link
            to={"/"}
            className="w-max h-fit select-none"
        >
            <img
                className="block w-auto mx-auto pointer-events-none"
                style={{ height: logoSize }}
                src="/images/logo.svg"
                alt="Logo"
            />
            {
                showName ? (
                    <p className={`w-fit font-semibold hover:text-main-primary transition-colors ${primary ? "text-white" : "text-main-secondary"}`}>Mellow Sips</p>
                ) : null
            }
        </Link>
    )
}

export default Logo
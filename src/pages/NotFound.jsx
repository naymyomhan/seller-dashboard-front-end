import { ArrowLeft } from "lucide-react"
import { notfound } from "../assets"
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <img src={notfound} alt="404" className="w-80 h-80" />
            <Link to="/">
                <div className="bg-blue-500 text-white rounded-md px-5 py-1 text-sm flex flex-row items-center justify-center">
                    <ArrowLeft size={30} />
                    <span className="ml-2">LET&apos;S GO BACK</span>
                </div>
            </Link>
        </div>
    )
}

export default NotFound

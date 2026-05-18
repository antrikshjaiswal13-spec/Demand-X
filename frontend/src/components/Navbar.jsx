import { Link } from "react-router-dom"

function Navbar() {

    return (

        <nav className="flex justify-between items-center px-12 py-6 glass sticky top-0 z-50">

            <div className="flex items-center gap-2">
                <span className="text-4xl font-bold gradient-text">⚡</span>
                <h1 className="text-3xl font-bold gradient-text">
                    Demand-X
                </h1>
            </div>

            <div className="flex gap-8 text-lg">

                <Link to="/" className="relative text-white hover:text-cyan-400 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 hover:after:w-full after:transition-all">
                    Home
                </Link>

                <Link to="/dashboard" className="relative text-white hover:text-cyan-400 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 hover:after:w-full after:transition-all">
                    Dashboard
                </Link>

                <Link to="/prediction" className="relative text-white hover:text-cyan-400 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 hover:after:w-full after:transition-all">
                    Prediction
                </Link>

                <Link to="/warehouse" className="relative text-white hover:text-cyan-400 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 hover:after:w-full after:transition-all">
                    Warehouse
                </Link>

                <Link to="/analytics" className="relative text-white hover:text-cyan-400 transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 hover:after:w-full after:transition-all">
                    Analytics
                </Link>

            </div>

        </nav>
    )
}

export default Navbar
import { Link } from "react-router-dom"

function Navbar() {

    return (

        <nav className="flex justify-between items-center px-12 py-6 bg-slate-950 border-b border-slate-800 sticky top-0 z-50">

            <h1 className="text-4xl font-bold text-blue-500">
                Demand-X
            </h1>

            <div className="flex gap-8 text-lg">

                <Link to="/" className="hover:text-blue-400 transition">
                    Home
                </Link>

                <Link to="/dashboard" className="hover:text-blue-400 transition">
                    Dashboard
                </Link>

                <Link to="/prediction" className="hover:text-blue-400 transition">
                    Prediction
                </Link>

                <Link to="/warehouse" className="hover:text-blue-400 transition">
                    Warehouse
                </Link>

                <Link to="/analytics" className="hover:text-blue-400 transition">
                    Analytics
                </Link>

            </div>

        </nav>
    )
}

export default Navbar
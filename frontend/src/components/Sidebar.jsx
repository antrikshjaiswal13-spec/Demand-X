import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="w-64 h-screen bg-slate-950 fixed left-0 top-0 p-5">

            <h1 className="text-3xl font-bold text-blue-500 mb-10">
                Demand-X
            </h1>

            <div className="flex flex-col gap-4">

                <Link to="/" className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600">
                    Home
                </Link>

                <Link to="/dashboard" className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600">
                    Dashboard
                </Link>

                <Link to="/prediction" className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600">
                    Prediction
                </Link>

                <Link to="/warehouse" className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600">
                    Warehouse
                </Link>

                <Link to="/analytics" className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600">
                    Analytics
                </Link>

            </div>

        </div>
    )
}

export default Sidebar
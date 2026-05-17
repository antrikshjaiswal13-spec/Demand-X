import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import {
    Brain,
    Warehouse,
    BarChart3
} from "lucide-react"

function Home() {

    return (

        <div className="bg-slate-950 text-white min-h-screen">

            <Navbar />

            {/* Hero Section */}

            <section className="flex flex-col justify-center items-center text-center min-h-screen px-10">

                <h1 className="text-7xl font-bold leading-tight max-w-5xl">

                    Smart <span className="text-blue-500">AI Demand Forecasting</span> For Modern Industries

                </h1>

                <p className="text-gray-400 text-xl mt-8 max-w-3xl leading-relaxed">

                    Demand-X helps companies reduce losses,
                    optimize production, predict future demand,
                    and manage warehouse inventory using Artificial Intelligence.

                </p>

                <div className="flex gap-6 mt-10">

                    <Link
                        to="/dashboard"
                        className="bg-blue-600 px-8 py-4 rounded-2xl text-lg hover:bg-blue-700 transition"
                    >
                        Open Dashboard
                    </Link>

                    <Link
                        to="/prediction"
                        className="border border-gray-500 px-8 py-4 rounded-2xl text-lg hover:bg-slate-800 transition"
                    >
                        AI Prediction
                    </Link>

                </div>

            </section>

            {/* Features */}

            <section className="px-20 pb-24">

                <h2 className="text-5xl font-bold text-center mb-20">
                    Core Features
                </h2>

                <div className="grid grid-cols-3 gap-10">

                    {/* Card 1 */}

                    <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl hover:border-blue-500 transition">

                        <Brain size={50} className="text-blue-500 mb-6" />

                        <h3 className="text-3xl font-bold mb-4">
                            AI Forecasting
                        </h3>

                        <p className="text-gray-400 leading-relaxed">

                            Predict future product demand using machine learning
                            and previous sales records to reduce overproduction losses.

                        </p>

                    </div>

                    {/* Card 2 */}

                    <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl hover:border-blue-500 transition">

                        <Warehouse size={50} className="text-blue-500 mb-6" />

                        <h3 className="text-3xl font-bold mb-4">
                            Warehouse Scanner
                        </h3>

                        <p className="text-gray-400 leading-relaxed">

                            Detect products from warehouse images and instantly
                            find availability, quantity, and rack location.

                        </p>

                    </div>

                    {/* Card 3 */}

                    <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl hover:border-blue-500 transition">

                        <BarChart3 size={50} className="text-blue-500 mb-6" />

                        <h3 className="text-3xl font-bold mb-4">
                            Analytics Dashboard
                        </h3>

                        <p className="text-gray-400 leading-relaxed">

                            Visualize sales trends, demand analytics,
                            inventory status, and AI insights in real time.

                        </p>

                    </div>

                </div>

            </section>

        </div>
    )
}

export default Home
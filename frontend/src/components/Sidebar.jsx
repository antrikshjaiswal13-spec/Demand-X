import { Link } from "react-router-dom";
import { Home, BarChart3, Brain, Warehouse, TrendingUp } from "lucide-react";

function Sidebar() {

    const menuItems = [
        { path: "/", label: "Home", icon: Home },
        { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
        { path: "/prediction", label: "Prediction", icon: Brain },
        { path: "/warehouse", label: "Warehouse", icon: Warehouse },
        { path: "/analytics", label: "Analytics", icon: TrendingUp }
    ];

    return (

        <div className="w-64 h-screen glass fixed left-0 top-0 p-6 border-r border-cyan-500/20 flex flex-col">

            <div className="flex items-center gap-2 mb-10">
                <span className="text-3xl">⚡</span>
                <h1 className="text-2xl font-bold gradient-text">
                    Demand-X
                </h1>
            </div>

            <nav className="flex flex-col gap-3 flex-1">
                {menuItems.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path} 
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
                    >
                        <item.icon size={20} className="text-cyan-400 group-hover:text-cyan-300" />
                        <span className="text-white group-hover:text-cyan-300">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="pt-6 border-t border-cyan-500/20 text-center text-gray-500 text-sm">
                <p>© 2024 Demand-X</p>
            </div>

        </div>
    )
}

export default Sidebar
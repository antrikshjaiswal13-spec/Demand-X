import Navbar from "../components/Navbar"
import ThreeD from "../components/ThreeD"
import { Link } from "react-router-dom"
import {
    Brain,
    Warehouse,
    BarChart3,
    Zap,
    TrendingUp,
    Shield,
    ShoppingCart,
    Package,
    Activity,
    Target,
    Clock,
    Lightbulb
} from "lucide-react"

function Home() {

    const stats = [
        { value: "95%", label: "Forecast Accuracy", icon: Target },
        { value: "40%", label: "Revenue Increase", icon: TrendingUp },
        { value: "60%", label: "Cost Reduction", icon: Zap },
        { value: "100+", label: "Active Users", icon: Activity }
    ]

    return (

        <div className="w-full text-white min-h-screen overflow-x-hidden">

            <Navbar />

            {/* Hero Section with 3D Graphics */}

            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">

                {/* 3D Background */}
                <div className="absolute inset-0 w-full h-full">
                    <ThreeD />
                </div>

                {/* Hero Content Overlay */}
                <div className="relative z-10 flex flex-col justify-center items-center text-center px-10 max-w-5xl">

                    <div className="mb-8 inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-100/10 to-sky-100/10 border border-blue-100/20">
    <span className="badge text-blue-100">
        ✨ AI-Powered Intelligence
    </span>
</div>

                    <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-400 bg-clip-text text-transparent">

                        Demand-X

                    </h1>

                    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-gray-100">

                        Intelligent <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text">Demand Forecasting</span> For Modern Supply Chains

                    </h2>

                    <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-4xl leading-relaxed">

                        Predict what customers will buy before they buy it. Optimize inventory, reduce waste, and maximize profits with enterprise-grade AI that understands your market.

                    </p>

                    <div className="flex gap-4 mt-12 flex-wrap justify-center">

                        <Link
                            to="/dashboard"
                            className="btn-primary hover:scale-105 transition-transform"
                        >
                            📊 Explore Dashboard
                        </Link>

                        <Link
                            to="/prediction"
                            className="btn-secondary hover:scale-105 transition-transform"
                        >
                            🚀 Try Predictions
                        </Link>

                        <Link
    to="/warehouse"
    className="px-8 py-4 rounded-lg bg-green-200/20 border border-green-500/40 text-green-100 hover:bg-green-200/30 transition"
>
    📦 Warehouse View
</Link>
                    </div>

                </div>

            </section>

            {/* Stats Section */}

            <section className="relative z-20 px-10 md:px-20 py-20 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 border-y border-blue-600/20">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <Icon className="text-blue-600" size={40} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-400 font-semibold">{stat.label}</p>
                            </div>
                        )
                    })}

                </div>

            </section>

            {/* Features Section */}

            <section className="relative z-20 px-10 md:px-20 py-24 bg-gradient-to-b from-blue-950 via-slate-950 to-blue-950">

                <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-400 bg-clip-text text-transparent">
                    Powerful Features
                </h2>

                <p className="text-center text-gray-400 text-xl mb-20 max-w-3xl mx-auto">
                    End-to-end solutions for your entire supply chain ecosystem
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Card 1 - Buy Prediction */}

                    <div className="group relative overflow-hidden rounded-xl border border-blue-600/30 bg-gradient-to-br from-blue-600/10 to-blue-500/5 p-8 hover:border-blue-600/60 transition-all duration-300">

                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-500/20 mb-6 group-hover:scale-110 transition-transform">
                            <ShoppingCart size={32} className="text-blue-600" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-blue-400">
                            Buy Predictions
                        </h3>

                        <p className="text-gray-400 leading-relaxed mb-6">

                            Forecast customer purchasing behavior with 95%+ accuracy. Know what buyers want before the season starts.

                        </p>

                        <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                            Explore → 
                        </div>

                    </div>

                    {/* Card 2 - Inventory Optimization */}

                    <div className="group relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-8 hover:border-green-400/60 transition-all duration-300">

                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
                            <Package size={32} className="text-green-400" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-green-300">
                            Inventory Optimization
                        </h3>

                        <p className="text-gray-400 leading-relaxed mb-6">

                            Smart warehouse management with AI vision. Detect products instantly, track stock levels, and optimize storage.

                        </p>

                        <div className="flex items-center text-green-400 text-sm font-semibold group-hover:gap-2 transition-all">
                            Explore →
                        </div>

                    </div>

                    {/* Card 3 - Analytics & Insights */}

                    <div className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-8 hover:border-purple-400/60 transition-all duration-300">

                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6 group-hover:scale-110 transition-transform">
                            <BarChart3 size={32} className="text-purple-400" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-purple-300">
                            Analytics & Insights
                        </h3>

                        <p className="text-gray-400 leading-relaxed mb-6">

                            Real-time dashboards with actionable insights. Monitor trends, identify patterns, and make data-driven decisions.

                        </p>

                        <div className="flex items-center text-purple-400 text-sm font-semibold group-hover:gap-2 transition-all">
                            Explore →
                        </div>

                    </div>

                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Card 4 */}

                    <div className="group relative overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 p-8 hover:border-orange-400/60 transition-all duration-300">

                        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp size={32} className="text-orange-400" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-orange-300">
                            Sales Optimization
                        </h3>

                        <p className="text-gray-400 leading-relaxed">

                            Increase revenue by 40%+ with smart pricing and sales strategies driven by AI predictions and market analysis.

                        </p>

                    </div>

                    {/* Card 5 */}

                    <div className="group relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 p-8 hover:border-blue-400/60 transition-all duration-300">

                        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mb-6 group-hover:scale-110 transition-transform">
                            <Clock size={32} className="text-blue-400" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-blue-300">
                            Real-time Monitoring
                        </h3>

                        <p className="text-gray-400 leading-relaxed">

                            Monitor your entire supply chain in real-time. Get instant alerts for inventory issues and demand spikes.

                        </p>

                    </div>

                    {/* Card 6 */}

                    <div className="group relative overflow-hidden rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-red-500/5 p-8 hover:border-rose-400/60 transition-all duration-300">

                        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-rose-500/20 to-red-500/20 mb-6 group-hover:scale-110 transition-transform">
                            <Brain size={32} className="text-rose-400" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-rose-300">
                            Machine Learning Engine
                        </h3>

                        <p className="text-gray-400 leading-relaxed">

                            Advanced AI trained on millions of data points. Our models learn and improve continuously from your data.

                        </p>

                    </div>

                </div>

            </section>

            {/* Business Impact Section */}

            <section className="relative z-20 px-10 md:px-20 py-24 bg-gradient-to-b from-slate-950 via-purple-950/40 to-slate-950 border-t border-blue-600/20">

                <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Why Leading Companies Choose Demand-X
                </h2>

                <p className="text-center text-gray-400 text-xl mb-20 max-w-3xl mx-auto">
                    Transform your supply chain with proven results and enterprise-grade reliability
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Benefit 1 */}
                    <div className="group relative p-8 rounded-xl border border-blue-600/20 bg-blue-950/10 hover:border-blue-600/50 hover:bg-blue-950/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                        
                        <Zap className="text-blue-600 mb-4" size={36} />
                        <h3 className="text-2xl font-bold mb-3 text-blue-400">Lightning Fast</h3>
                        <p className="text-gray-400">Process millions of data points in milliseconds. Real-time predictions mean instant insights.</p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="group relative p-8 rounded-xl border border-green-500/20 bg-green-950/10 hover:border-green-400/50 hover:bg-green-950/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                        
                        <TrendingUp className="text-green-400 mb-4" size={36} />
                        <h3 className="text-2xl font-bold mb-3 text-green-300">Proven ROI</h3>
                        <p className="text-gray-400">40% revenue increase and 60% cost reduction on average. Results you can measure within months.</p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="group relative p-8 rounded-xl border border-purple-500/20 bg-purple-950/10 hover:border-purple-400/50 hover:bg-purple-950/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                        
                        <Shield className="text-purple-400 mb-4" size={36} />
                        <h3 className="text-2xl font-bold mb-3 text-purple-300">Enterprise Secure</h3>
                        <p className="text-gray-400">Bank-grade encryption, compliance-ready, and fully auditable. Your data is safe.</p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="group relative p-8 rounded-xl border border-orange-500/20 bg-orange-950/10 hover:border-orange-400/50 hover:bg-orange-950/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                        
                        <Brain className="text-orange-400 mb-4" size={36} />
                        <h3 className="text-2xl font-bold mb-3 text-orange-300">Smart Learning</h3>
                        <p className="text-gray-400">AI models that improve over time. The more you use it, the smarter it gets.</p>
                    </div>

                    {/* Benefit 5 */}
                    <div className="group relative p-8 rounded-xl border border-rose-500/20 bg-rose-950/10 hover:border-rose-400/50 hover:bg-rose-950/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                        
                        <Lightbulb className="text-rose-400 mb-4" size={36} />
                        <h3 className="text-2xl font-bold mb-3 text-rose-300">Easy Integration</h3>
                        <p className="text-gray-400">Seamlessly connects with your existing systems. Setup in days, not months.</p>
                    </div>

                    {/* Benefit 6 */}
                    <div className="group relative p-8 rounded-xl border border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-400/50 hover:bg-indigo-950/20 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                        
                        <Activity className="text-indigo-400 mb-4" size={36} />
                        <h3 className="text-2xl font-bold mb-3 text-indigo-300">24/7 Support</h3>
                        <p className="text-gray-400">Expert team available round the clock. We're here when you need us.</p>
                    </div>

                </div>

            </section>

            {/* Use Cases Section */}

            <section className="relative z-20 px-10 md:px-20 py-24 bg-gradient-to-b from-blue-950/30 via-slate-950 to-purple-950/30 border-y border-blue-600/20">

                <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Trusted By Industry Leaders
                </h2>

                <p className="text-center text-gray-400 text-xl mb-20 max-w-3xl mx-auto">
                    From retail to manufacturing, Demand-X powers supply chains across industries
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Use Case 1 */}
                    <div className="relative p-8 rounded-xl border border-slate-700 bg-slate-800/30 backdrop-blur">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-semibold mb-4">Retail</div>
                        <h3 className="text-2xl font-bold mb-4">E-Commerce & Retail</h3>
                        <p className="text-gray-400 mb-6">Forecast seasonal trends, optimize stock levels, and reduce stockouts by 80%.</p>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li>✓ Seasonal demand prediction</li>
                            <li>✓ Dynamic pricing optimization</li>
                            <li>✓ Inventory optimization</li>
                        </ul>
                    </div>

                    {/* Use Case 2 */}
                    <div className="relative p-8 rounded-xl border border-slate-700 bg-slate-800/30 backdrop-blur">
                        <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold mb-4">Manufacturing</div>
                        <h3 className="text-2xl font-bold mb-4">Manufacturing & Supply</h3>
                        <p className="text-gray-400 mb-6">Predict raw material needs, optimize production schedules, and reduce waste.</p>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li>✓ Production forecasting</li>
                            <li>✓ Material planning</li>
                            <li>✓ Waste reduction</li>
                        </ul>
                    </div>

                    {/* Use Case 3 */}
                    <div className="relative p-8 rounded-xl border border-slate-700 bg-slate-800/30 backdrop-blur">
                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold mb-4">Distribution</div>
                        <h3 className="text-2xl font-bold mb-4">Logistics & Distribution</h3>
                        <p className="text-gray-400 mb-6">Optimize warehouse space, predict shipment volumes, and reduce costs.</p>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li>✓ Demand distribution</li>
                            <li>✓ Logistics optimization</li>
                            <li>✓ Route planning</li>
                        </ul>
                    </div>

                </div>

            </section>

            {/* Pricing Section */}

            <section className="relative z-20 px-10 md:px-20 py-24 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">

                <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Flexible Pricing For Any Scale
                </h2>

                <p className="text-center text-gray-400 text-xl mb-20 max-w-3xl mx-auto">
                    Start free and scale as you grow. No credit card required.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Plan 1 */}
                    <div className="relative p-8 rounded-xl border border-slate-700 bg-slate-950/50">
                        <h3 className="text-2xl font-bold mb-2">Starter</h3>
                        <p className="text-gray-400 mb-6 text-sm">Perfect for getting started</p>
                        <div className="text-4xl font-bold mb-6">Free<span className="text-lg text-gray-400">/month</span></div>
                        <Link to="/dashboard" className="w-full block text-center px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition mb-8">
                            Get Started
                        </Link>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li>✓ Up to 1000 predictions/month</li>
                            <li>✓ Basic analytics</li>
                            <li>✓ Email support</li>
                            <li>✗ Team collaboration</li>
                        </ul>
                    </div>

                    {/* Plan 2 */}
                    <div className="relative p-8 rounded-xl border-2 border-blue-600 bg-gradient-to-br from-blue-950/30 to-blue-900/30 ring-1 ring-blue-600/50 md:scale-105 md:z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full text-sm">
                            POPULAR
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-blue-400">Professional</h3>
                        <p className="text-gray-400 mb-6 text-sm">For growing teams</p>
                        <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-gray-400">/month</span></div>
                        <Link to="/dashboard" className="w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold transition mb-8">
                            Start Trial
                        </Link>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li>✓ Unlimited predictions</li>
                            <li>✓ Advanced analytics</li>
                            <li>✓ Priority support</li>
                            <li>✓ Team collaboration (5 users)</li>
                        </ul>
                    </div>

                    {/* Plan 3 */}
                    <div className="relative p-8 rounded-xl border border-slate-700 bg-slate-950/50">
                        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                        <p className="text-gray-400 mb-6 text-sm">For large organizations</p>
                        <div className="text-4xl font-bold mb-6">Custom<span className="text-lg text-gray-400">/month</span></div>
                        <button className="w-full px-6 py-3 rounded-lg border border-blue-600 text-blue-400 hover:bg-blue-600/10 font-semibold transition mb-8">
                            Contact Sales
                        </button>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li>✓ Everything in Professional</li>
                            <li>✓ Custom integrations</li>
                            <li>✓ Dedicated support</li>
                            <li>✓ Unlimited users</li>
                        </ul>
                    </div>

                </div>

            </section>

            {/* Final CTA Section */}

            <section className="relative z-20 px-10 md:px-20 py-32 bg-gradient-to-r from-slate-950 via-cyan-950/30 to-purple-950/30 border-y border-blue-600/30">

                <div className="max-w-4xl mx-auto">

                    <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-blue-500 to-purple-400 bg-clip-text text-transparent">

                        Ready to Transform Your Supply Chain?

                    </h2>

                    <p className="text-xl text-center text-gray-300 mb-12">

                        Join thousands of companies using Demand-X to predict, optimize, and dominate their market. Start for free today.

                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

                        <Link
                            to="/dashboard"
                            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            🚀 Start Free Trial
                        </Link>

                        <Link
                            to="/prediction"
                            className="px-10 py-4 rounded-lg border border-blue-600/50 text-blue-400 hover:bg-blue-600/10 transition font-semibold"
                        >
                            ← See Demo
                        </Link>

                    </div>

                    <p className="text-center text-gray-500 text-sm mt-8">

                        No credit card required • Free forever plan available • 14-day professional trial

                    </p>

                </div>

            </section>

            {/* Footer */}

            <footer className="relative z-20 border-t border-blue-600/20 px-10 md:px-20 py-16 bg-gradient-to-r from-slate-950 via-blue-950/40 to-slate-950">

                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Demand-X</h4>
                            <p className="text-gray-400 text-sm">AI-powered demand forecasting for modern supply chains.</p>
                        </div>

                        <div>
                            <h5 className="font-semibold text-white mb-4">Product</h5>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link></li>
                                <li><Link to="/prediction" className="hover:text-blue-600 transition">Predictions</Link></li>
                                <li><Link to="/warehouse" className="hover:text-blue-600 transition">Warehouse</Link></li>
                                <li><Link to="/analytics" className="hover:text-blue-600 transition">Analytics</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-white mb-4">Company</h5>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#about" className="hover:text-blue-600 transition">About</a></li>
                                <li><a href="#pricing" className="hover:text-blue-600 transition">Pricing</a></li>
                                <li><a href="#blog" className="hover:text-blue-600 transition">Blog</a></li>
                                <li><a href="#contact" className="hover:text-blue-600 transition">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-white mb-4">Legal</h5>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#privacy" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                                <li><a href="#terms" className="hover:text-blue-600 transition">Terms of Service</a></li>
                                <li><a href="#security" className="hover:text-blue-600 transition">Security</a></li>
                            </ul>
                        </div>

                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">

                        <p className="text-gray-500 text-sm">&copy; 2024 Demand-X. All rights reserved. | Powered by Advanced AI</p>

                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#twitter" className="text-gray-400 hover:text-blue-600 transition">Twitter</a>
                            <a href="#linkedin" className="text-gray-400 hover:text-blue-600 transition">LinkedIn</a>
                            <a href="#github" className="text-gray-400 hover:text-blue-600 transition">GitHub</a>
                        </div>

                    </div>

                </div>

            </footer>

        </div>

    )
}

export default Home
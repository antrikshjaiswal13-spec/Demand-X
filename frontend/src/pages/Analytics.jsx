import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { TrendingUp, BarChart3, PieChart } from 'lucide-react'

function Analytics() {
    const [analyticsData, setAnalyticsData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/analytics')
            setAnalyticsData(response.data)
        } catch (error) {
            console.error('Error fetching analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex w-full min-h-screen text-white" style={{background: 'linear-gradient(135deg, #050a12 0%, #0a1428 50%, #1a0033 100%)'}}>
            <Sidebar />
            <div className="ml-64 p-10 w-full">
                <div className="mb-12">
                    <h1 className="text-6xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-400">Insights and trends analysis</p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                        <p className="mt-4 text-cyan-300">Loading analytics...</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card border-l-4 border-cyan-500 group hover:border-cyan-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 mb-2 text-sm">Total Predictions</p>
                                        <p className="text-4xl font-bold text-cyan-400">{analyticsData?.total_predictions}</p>
                                    </div>
                                    <BarChart3 size={40} className="text-cyan-400/50 group-hover:text-cyan-400 transition" />
                                </div>
                            </div>

                            <div className="card border-l-4 border-green-500 group hover:border-green-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 mb-2 text-sm">Model Accuracy</p>
                                        <p className="text-4xl font-bold text-green-400">{(analyticsData?.accuracy * 100).toFixed(1)}%</p>
                                    </div>
                                    <TrendingUp size={40} className="text-green-400/50 group-hover:text-green-400 transition" />
                                </div>
                            </div>

                            <div className="card border-l-4 border-purple-500 group hover:border-purple-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 mb-2 text-sm">Data Points</p>
                                        <p className="text-4xl font-bold text-purple-400">1,000+</p>
                                    </div>
                                    <PieChart size={40} className="text-purple-400/50 group-hover:text-purple-400 transition" />
                                </div>
                            </div>
                        </div>

                        {/* Monthly Trends */}
                        <div className="card">
                            <h2 className="text-2xl font-bold mb-8 gradient-text">📈 Monthly Sales Trend</h2>
                            <div className="space-y-4">
                                {analyticsData?.monthly_data && Object.entries(analyticsData.monthly_data).map(([month, value]) => (
                                    <div key={month}>
                                        <div className="flex justify-between mb-2">
                                            <span className="capitalize text-gray-300 font-medium">{month}</span>
                                            <span className="font-bold text-cyan-400">₹{value.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-slate-700/30 rounded-full h-3 border border-cyan-500/20">
                                            <div
                                                className="bg-gradient-to-r from-cyan-500 to-green-500 h-3 rounded-full transition-all"
                                                style={{ width: `${(value / 300000) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card border-l-4 border-cyan-500 bg-gradient-to-br from-cyan-950/30 to-blue-950/20">
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">📊 Insights</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex gap-2">
                                        <span className="text-cyan-400">▸</span>
                                        <span>Demand shows 15% growth trend</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cyan-400">▸</span>
                                        <span>Peak sales in March quarter</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cyan-400">▸</span>
                                        <span>High accuracy in recent predictions</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cyan-400">▸</span>
                                        <span>Model updated with latest data</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="card border-l-4 border-green-500 bg-gradient-to-br from-green-950/30 to-emerald-950/20">
                                <h3 className="text-xl font-bold mb-4 text-green-300">🎯 Recommendations</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex gap-2">
                                        <span className="text-green-400">▸</span>
                                        <span>Increase inventory by 20% for March</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-400">▸</span>
                                        <span>Focus on high-demand categories</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-400">▸</span>
                                        <span>Optimize warehouse allocation</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-400">▸</span>
                                        <span>Plan seasonal promotions ahead</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="card">
                            <h2 className="text-2xl font-bold mb-8 gradient-text">⚙️ Model Performance</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-gray-400 mb-3 font-medium">R² Score</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 bg-slate-700/30 rounded-full h-3 border border-cyan-500/20">
                                            <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-3 rounded-full w-4/5"></div>
                                        </div>
                                        <span className="font-bold text-cyan-400 min-w-fit">0.92</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-400 mb-3 font-medium">RMSE</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 bg-slate-700/30 rounded-full h-3 border border-green-500/20">
                                            <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full w-3/5"></div>
                                        </div>
                                        <span className="font-bold text-green-400 min-w-fit">₹450</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Analytics
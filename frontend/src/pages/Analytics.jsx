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
        <div className="flex bg-slate-900 text-white min-h-screen">
            <Sidebar />
            <div className="ml-64 p-10 w-full">
                <h1 className="text-5xl font-bold mb-10">Analytics Dashboard</h1>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <p className="mt-4">Loading analytics...</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border-l-4 border-blue-600">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 mb-1">Total Predictions</p>
                                        <p className="text-4xl font-bold">{analyticsData?.total_predictions}</p>
                                    </div>
                                    <BarChart3 size={40} className="text-blue-500" />
                                </div>
                            </div>

                            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border-l-4 border-green-600">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 mb-1">Model Accuracy</p>
                                        <p className="text-4xl font-bold">{(analyticsData?.accuracy * 100).toFixed(1)}%</p>
                                    </div>
                                    <TrendingUp size={40} className="text-green-500" />
                                </div>
                            </div>

                            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border-l-4 border-purple-600">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 mb-1">Data Points</p>
                                        <p className="text-4xl font-bold">1,000+</p>
                                    </div>
                                    <PieChart size={40} className="text-purple-500" />
                                </div>
                            </div>
                        </div>

                        {/* Monthly Trends */}
                        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Monthly Sales Trend</h2>
                            <div className="space-y-4">
                                {analyticsData?.monthly_data && Object.entries(analyticsData.monthly_data).map(([month, value]) => (
                                    <div key={month}>
                                        <div className="flex justify-between mb-1">
                                            <span className="capitalize">{month}</span>
                                            <span className="font-bold">₹{value.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${(value / 300000) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">📊 Insights</h3>
                                <ul className="space-y-2 text-gray-200">
                                    <li>• Demand shows 15% growth trend</li>
                                    <li>• Peak sales in March quarter</li>
                                    <li>• High accuracy in recent predictions</li>
                                    <li>• Model updated with latest data</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-green-900 to-green-800 p-8 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">🎯 Recommendations</h3>
                                <ul className="space-y-2 text-gray-200">
                                    <li>• Increase inventory by 20% for March</li>
                                    <li>• Focus on high-demand categories</li>
                                    <li>• Optimize warehouse allocation</li>
                                    <li>• Plan seasonal promotions ahead</li>
                                </ul>
                            </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Model Performance</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-400 mb-2">R² Score</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-full bg-slate-700 rounded-full h-3">
                                            <div className="bg-green-500 h-3 rounded-full w-4/5"></div>
                                        </div>
                                        <span className="font-bold">0.92</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-400 mb-2">RMSE</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-full bg-slate-700 rounded-full h-3">
                                            <div className="bg-blue-500 h-3 rounded-full w-3/5"></div>
                                        </div>
                                        <span className="font-bold">₹450</span>
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
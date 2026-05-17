import { useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { AlertCircle, CheckCircle, Loader, BarChart3, TrendingUp } from 'lucide-react'

function ProductionPlanning() {
    const [formData, setFormData] = useState({
        Item_Weight: '',
        Item_Fat_Content: 'Low Fat',
        Item_Visibility: '',
        Item_Type: 'Dairy',
        Item_MRP: '',
        Outlet_Establishment_Year: 1999,
        Outlet_Size: 'Medium',
        Outlet_Location_Type: 'Tier1',
        Outlet_Type: 'Supermarket Type1',
        Profit: '',
        Month: 5  // May
    })

    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'Outlet_Establishment_Year' || name === 'Month' ? parseInt(value) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/production-plan', {
                Item_Weight: parseFloat(formData.Item_Weight),
                Item_Fat_Content: formData.Item_Fat_Content,
                Item_Visibility: parseFloat(formData.Item_Visibility),
                Item_Type: formData.Item_Type,
                Item_MRP: parseFloat(formData.Item_MRP),
                Outlet_Establishment_Year: formData.Outlet_Establishment_Year,
                Outlet_Size: formData.Outlet_Size,
                Outlet_Location_Type: formData.Outlet_Location_Type,
                Outlet_Type: formData.Outlet_Type,
                Profit: parseFloat(formData.Profit),
                Month: formData.Month
            })

            setPlan(response.data)
            setSuccess(true)
        } catch (err) {
            setError(err.response?.data?.error || 'Production plan generation failed. Please try again.')
            console.error('Production plan error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex bg-slate-900 text-white min-h-screen">
            <Sidebar />
            <div className="ml-64 p-10 w-full">
                <h1 className="text-5xl font-bold mb-2">Production Planning</h1>
                <p className="text-gray-400 mb-10">Calculate optimal production quantity for maximum profit</p>

                <div className="grid grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="col-span-2">
                        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Product & Market Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Product Section */}
                                <div className="bg-slate-700 p-4 rounded-lg mb-4">
                                    <h3 className="text-lg font-semibold mb-3 text-blue-400">Product Details</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Item Weight (kg)</label>
                                            <input
                                                type="number"
                                                name="Item_Weight"
                                                value={formData.Item_Weight}
                                                onChange={handleChange}
                                                placeholder="e.g., 9.3"
                                                step="0.1"
                                                required
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Fat Content</label>
                                            <select
                                                name="Item_Fat_Content"
                                                value={formData.Item_Fat_Content}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            >
                                                <option value="Low Fat">Low Fat</option>
                                                <option value="Regular">Regular</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Item Visibility</label>
                                            <input
                                                type="number"
                                                name="Item_Visibility"
                                                value={formData.Item_Visibility}
                                                onChange={handleChange}
                                                placeholder="e.g., 0.016"
                                                step="0.001"
                                                required
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Item Type</label>
                                            <select
                                                name="Item_Type"
                                                value={formData.Item_Type}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            >
                                                <option value="Dairy">Dairy</option>
                                                <option value="Meat">Meat</option>
                                                <option value="Fruits and Vegetables">Fruits and Vegetables</option>
                                                <option value="Snack Foods">Snack Foods</option>
                                                <option value="Baking Goods">Baking Goods</option>
                                                <option value="Breakfast">Breakfast</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">MRP (₹)</label>
                                            <input
                                                type="number"
                                                name="Item_MRP"
                                                value={formData.Item_MRP}
                                                onChange={handleChange}
                                                placeholder="e.g., 249.8"
                                                step="0.1"
                                                required
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Profit/Unit (₹)</label>
                                            <input
                                                type="number"
                                                name="Profit"
                                                value={formData.Profit}
                                                onChange={handleChange}
                                                placeholder="e.g., 11.5"
                                                step="0.1"
                                                required
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Outlet Section */}
                                <div className="bg-slate-700 p-4 rounded-lg mb-4">
                                    <h3 className="text-lg font-semibold mb-3 text-green-400">Outlet Characteristics</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Outlet Year</label>
                                            <input
                                                type="number"
                                                name="Outlet_Establishment_Year"
                                                value={formData.Outlet_Establishment_Year}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Outlet Size</label>
                                            <select
                                                name="Outlet_Size"
                                                value={formData.Outlet_Size}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            >
                                                <option value="Small">Small</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Location Tier</label>
                                            <select
                                                name="Outlet_Location_Type"
                                                value={formData.Outlet_Location_Type}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            >
                                                <option value="Tier1">Tier 1</option>
                                                <option value="Tier 2">Tier 2</option>
                                                <option value="Tier 3">Tier 3</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Outlet Type</label>
                                            <select
                                                name="Outlet_Type"
                                                value={formData.Outlet_Type}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                            >
                                                <option value="Supermarket Type1">Supermarket Type1</option>
                                                <option value="Supermarket Type2">Supermarket Type2</option>
                                                <option value="Supermarket Type3">Supermarket Type3</option>
                                                <option value="Grocery Store">Grocery Store</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Time Section */}
                                <div className="bg-slate-700 p-4 rounded-lg mb-6">
                                    <h3 className="text-lg font-semibold mb-3 text-purple-400">Planning Period</h3>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Select Month</label>
                                        <select
                                            name="Month"
                                            value={formData.Month}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:border-blue-400"
                                        >
                                            <option value={1}>January</option>
                                            <option value={2}>February</option>
                                            <option value={3}>March</option>
                                            <option value={4}>April</option>
                                            <option value={5}>May</option>
                                            <option value={6}>June</option>
                                            <option value={7}>July</option>
                                            <option value={8}>August</option>
                                            <option value={9}>September</option>
                                            <option value={10}>October</option>
                                            <option value={11}>November</option>
                                            <option value={12}>December</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition text-lg"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader size={20} className="animate-spin" />
                                            Generating Plan...
                                        </div>
                                    ) : (
                                        'Generate Production Plan'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {error && (
                            <div className="bg-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-lg flex gap-3">
                                <AlertCircle size={24} className="flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold mb-1">Planning Error</h3>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {success && plan && (
                            <div className="space-y-4">
                                {/* Main Aggregated Results */}
                                <div className="bg-gradient-to-br from-green-900 to-green-800 p-8 rounded-2xl shadow-lg border border-green-600">
                                    <div className="flex gap-3 mb-6">
                                        <CheckCircle size={32} className="text-green-400 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-2xl font-bold">Production Plan Generated!</h3>
                                            <p className="text-green-200 text-sm">{plan.month_name} {plan.year}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="bg-slate-800 bg-opacity-50 p-4 rounded-lg">
                                            <p className="text-gray-300 text-sm mb-1">Total Units to Produce</p>
                                            <p className="text-4xl font-bold text-green-400">{plan.aggregated.total_units_to_produce} units</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-800 bg-opacity-50 p-4 rounded-lg">
                                                <p className="text-gray-300 text-sm mb-1">Total Revenue</p>
                                                <p className="text-2xl font-bold text-blue-400">₹{plan.aggregated.total_predicted_revenue.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-slate-800 bg-opacity-50 p-4 rounded-lg">
                                                <p className="text-gray-300 text-sm mb-1">Total Profit</p>
                                                <p className="text-2xl font-bold text-yellow-400">₹{plan.aggregated.total_expected_profit.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800 bg-opacity-50 p-4 rounded-lg">
                                            <p className="text-gray-300 text-sm mb-1">Avg. Profit per Outlet</p>
                                            <p className="text-xl font-bold text-purple-400">₹{plan.aggregated.average_profit_per_outlet.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="bg-slate-800 p-6 rounded-xl">
                                    <h4 className="font-bold mb-3 flex gap-2 items-center">
                                        <BarChart3 size={20} className="text-indigo-400" />
                                        Product Summary
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Type:</span>
                                            <span className="font-semibold">{plan.product_info.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Weight:</span>
                                            <span className="font-semibold">{plan.product_info.weight} kg</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">MRP:</span>
                                            <span className="font-semibold">₹{plan.product_info.mrp}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Profit/Unit:</span>
                                            <span className="font-semibold text-green-400">₹{plan.product_info.profit_per_unit}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Outlet Breakdown */}
                                <div className="bg-slate-800 p-6 rounded-xl">
                                    <h4 className="font-bold mb-3 flex gap-2 items-center">
                                        <TrendingUp size={20} className="text-cyan-400" />
                                        By Outlet
                                    </h4>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {plan.outlet_details.map((outlet, idx) => (
                                            <div key={idx} className="bg-slate-700 p-3 rounded flex justify-between items-center hover:bg-slate-600 transition">
                                                <div>
                                                    <p className="font-semibold text-sm">{outlet.outlet_id}</p>
                                                    <p className="text-xs text-gray-400">{outlet.units_to_produce} units</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-green-400">₹{outlet.profit.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-400">Revenue: ₹{outlet.predicted_sales.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-900 bg-opacity-30 border border-blue-700 p-4 rounded-lg text-sm text-blue-300">
                                    <p>
                                        <strong>📊 Recommendation:</strong> Produce <strong>{plan.aggregated.total_units_to_produce} units</strong> of this product across all {plan.outlet_details.length} outlets in {plan.month_name} to achieve maximum profit of <strong>₹{plan.aggregated.total_expected_profit.toLocaleString()}</strong>.
                                    </p>
                                </div>
                            </div>
                        )}

                        {!success && !error && (
                            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4 flex gap-2 items-center">
                                    <BarChart3 size={24} className="text-blue-400" />
                                    How to Use
                                </h3>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex gap-2">
                                        <span className="text-green-400 font-bold">1.</span>
                                        <span>Enter product specifications (weight, type, price)</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-400 font-bold">2.</span>
                                        <span>Set outlet characteristics (size, location, type)</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-400 font-bold">3.</span>
                                        <span>Select the month you want to plan for</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-400 font-bold">4.</span>
                                        <span>Click "Generate Production Plan"</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-400 font-bold">5.</span>
                                        <span>See aggregated results across all outlets with profit projections</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductionPlanning

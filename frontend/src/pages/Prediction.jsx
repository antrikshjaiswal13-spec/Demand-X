import { useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { AlertCircle, CheckCircle, Loader } from 'lucide-react'

function Prediction() {
    const [formData, setFormData] = useState({
        Item_Weight: '',
        Item_Fat_Content: 'Low Fat',
        Item_Visibility: '',
        Item_Type: 'Dairy',
        Item_MRP: '',
        Outlet_Identifier: 'OUT049',
        Outlet_Establishment_Year: 1999,
        Outlet_Size: 'Medium',
        Outlet_Location_Type: 'Tier 2',
        Outlet_Type: 'Supermarket Type1',
        Profit: ''
    })

    const [prediction, setPrediction] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'Outlet_Establishment_Year' ? parseInt(value) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/predict', {
                Item_Weight: parseFloat(formData.Item_Weight),
                Item_Fat_Content: formData.Item_Fat_Content,
                Item_Visibility: parseFloat(formData.Item_Visibility),
                Item_Type: formData.Item_Type,
                Item_MRP: parseFloat(formData.Item_MRP),
                Outlet_Identifier: formData.Outlet_Identifier,
                Outlet_Establishment_Year: formData.Outlet_Establishment_Year,
                Outlet_Size: formData.Outlet_Size,
                Outlet_Location_Type: formData.Outlet_Location_Type,
                Outlet_Type: formData.Outlet_Type,
                Profit: parseFloat(formData.Profit)
            })

            setPrediction(response.data)
            setSuccess(true)
        } catch (err) {
            setError(err.response?.data?.error || 'Prediction failed. Please try again.')
            console.error('Prediction error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex w-full min-h-screen text-white" style={{background: 'linear-gradient(135deg, #050a12 0%, #0a1428 50%, #1a0033 100%)'}}>
            <Sidebar />
            <div className="ml-64 p-10 w-full">
                <div className="mb-12">
                    <h1 className="text-6xl font-bold gradient-text mb-2">Demand Prediction</h1>
                    <p className="text-gray-400">Predict product demand with AI accuracy</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Form Section */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-8">Enter Product Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Item Weight (kg)</label>
                                <input
                                    type="number"
                                    name="Item_Weight"
                                    value={formData.Item_Weight}
                                    onChange={handleChange}
                                    placeholder="e.g., 9.3"
                                    step="0.1"
                                    required
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Fat Content</label>
                                <select
                                    name="Item_Fat_Content"
                                    value={formData.Item_Fat_Content}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                >
                                    <option value="Low Fat">Low Fat</option>
                                    <option value="Regular">Regular</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Item Visibility</label>
                                <input
                                    type="number"
                                    name="Item_Visibility"
                                    value={formData.Item_Visibility}
                                    onChange={handleChange}
                                    placeholder="e.g., 0.016"
                                    step="0.001"
                                    required
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Item Type</label>
                                <select
                                    name="Item_Type"
                                    value={formData.Item_Type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                >
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Fruits and Vegetables">Fruits and Vegetables</option>
                                    <option value="Snack Foods">Snack Foods</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">MRP (₹)</label>
                                <input
                                    type="number"
                                    name="Item_MRP"
                                    value={formData.Item_MRP}
                                    onChange={handleChange}
                                    placeholder="e.g., 249.8"
                                    step="0.1"
                                    required
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Outlet Establishment Year</label>
                                <input
                                    type="number"
                                    name="Outlet_Establishment_Year"
                                    value={formData.Outlet_Establishment_Year}
                                    onChange={handleChange}
                                    placeholder="e.g., 1999"
                                    required
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Outlet Identifier</label>
                                <select
                                    name="Outlet_Identifier"
                                    value={formData.Outlet_Identifier}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                >
                                    <option value="OUT049">OUT049</option>
                                    <option value="OUT010">OUT010</option>
                                    <option value="OUT013">OUT013</option>
                                    <option value="OUT017">OUT017</option>
                                    <option value="OUT018">OUT018</option>
                                    <option value="OUT019">OUT019</option>
                                    <option value="OUT027">OUT027</option>
                                    <option value="OUT035">OUT035</option>
                                    <option value="OUT045">OUT045</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Outlet Location Type</label>
                                <select
                                    name="Outlet_Location_Type"
                                    value={formData.Outlet_Location_Type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                >
                                    <option value="Tier1">Tier 1</option>
                                    <option value="Tier 2">Tier 2</option>
                                    <option value="Tier 3">Tier 3</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Outlet Type</label>
                                <select
                                    name="Outlet_Type"
                                    value={formData.Outlet_Type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                >
                                    <option value="Supermarket Type1">Supermarket Type1</option>
                                    <option value="Supermarket Type2">Supermarket Type2</option>
                                    <option value="Supermarket Type3">Supermarket Type3</option>
                                    <option value="Grocery Store">Grocery Store</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-cyan-300">Profit (₹)</label>
                                <input
                                    type="number"
                                    name="Profit"
                                    value={formData.Profit}
                                    onChange={handleChange}
                                    placeholder="e.g., 11.5"
                                    step="0.1"
                                    required
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader size={20} className="animate-spin" />
                                        Predicting...
                                    </>
                                ) : (
                                    '🤖 Get Prediction'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {error && (
                            <div className="glass p-6 rounded-xl border border-red-500/50 bg-red-950/30">
                                <div className="flex gap-3">
                                    <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-red-300">Prediction Error</h3>
                                        <p className="text-red-200 text-sm mt-1">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {success && prediction && (
                            <div className="card border-green-500/30 bg-gradient-to-br from-green-950/30 to-cyan-950/30">
                                <div className="flex gap-3 mb-6">
                                    <CheckCircle size={28} className="text-green-400 flex-shrink-0" />
                                    <h3 className="text-2xl font-bold text-green-300">Prediction Successful!</h3>
                                </div>

                                <div className="bg-gradient-to-r from-cyan-900/40 to-green-900/40 p-6 rounded-lg mb-6 border border-cyan-500/30">
                                    <p className="text-gray-300 mb-2 text-sm">Predicted Sales</p>
                                    <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">₹ {prediction.predicted_sales}</p>
                                </div>

                                <div className="text-sm text-gray-400">
                                    <p>Generated at: {new Date(prediction.timestamp).toLocaleString()}</p>
                                </div>

                                <div className="mt-6 glass p-4 border border-cyan-500/30 bg-cyan-950/30">
                                    <p className="text-sm text-cyan-300">
                                        💡 <strong>Tip:</strong> This prediction is based on historical data and current market conditions. 
                                        Consider external factors like seasonal trends for better accuracy.
                                    </p>
                                </div>
                            </div>
                        )}

                        {!success && !error && (
                            <div className="card">
                                <h3 className="text-xl font-bold mb-4">📊 How to use</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex gap-3">
                                        <span className="text-cyan-400">✓</span>
                                        <span>Fill in all the product details from the form</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-cyan-400">✓</span>
                                        <span>Enter outlet and market information</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-cyan-400">✓</span>
                                        <span>Click "Get Prediction" to see demand forecast</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-cyan-400">✓</span>
                                        <span>Use predictions to optimize inventory</span>
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

export default Prediction
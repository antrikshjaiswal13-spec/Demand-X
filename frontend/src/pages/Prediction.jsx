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
        <div className="flex bg-slate-900 text-white min-h-screen">
            <Sidebar />
            <div className="ml-64 p-10 w-full">
                <h1 className="text-5xl font-bold mb-10">Demand Prediction</h1>

                <div className="grid grid-cols-2 gap-10">
                    {/* Form Section */}
                    <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Enter Product Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Fat Content</label>
                                <select
                                    name="Item_Fat_Content"
                                    value={formData.Item_Fat_Content}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Low Fat">Low Fat</option>
                                    <option value="Regular">Regular</option>
                                </select>
                            </div>

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
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Item Type</label>
                                <select
                                    name="Item_Type"
                                    value={formData.Item_Type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Fruits and Vegetables">Fruits and Vegetables</option>
                                    <option value="Snack Foods">Snack Foods</option>
                                </select>
                            </div>

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
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Outlet Establishment Year</label>
                                <input
                                    type="number"
                                    name="Outlet_Establishment_Year"
                                    value={formData.Outlet_Establishment_Year}
                                    onChange={handleChange}
                                    placeholder="e.g., 1999"
                                    required
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Outlet Identifier</label>
                                <select
                                    name="Outlet_Identifier"
                                    value={formData.Outlet_Identifier}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
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
                                <label className="block text-sm font-medium mb-2">Outlet Location Type</label>
                                <select
                                    name="Outlet_Location_Type"
                                    value={formData.Outlet_Location_Type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
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
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Supermarket Type1">Supermarket Type1</option>
                                    <option value="Supermarket Type2">Supermarket Type2</option>
                                    <option value="Supermarket Type3">Supermarket Type3</option>
                                    <option value="Grocery Store">Grocery Store</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Profit (₹)</label>
                                <input
                                    type="number"
                                    name="Profit"
                                    value={formData.Profit}
                                    onChange={handleChange}
                                    placeholder="e.g., 11.5"
                                    step="0.1"
                                    required
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 rounded-lg transition mt-6"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader size={20} className="animate-spin" />
                                        Predicting...
                                    </div>
                                ) : (
                                    'Get Prediction'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {error && (
                            <div className="bg-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-lg flex gap-3">
                                <AlertCircle size={24} className="flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold">Prediction Error</h3>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {success && prediction && (
                            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-green-600">
                                <div className="flex gap-3 mb-4">
                                    <CheckCircle size={28} className="text-green-500 flex-shrink-0" />
                                    <h3 className="text-2xl font-bold">Prediction Successful!</h3>
                                </div>

                                <div className="bg-slate-700 p-6 rounded-lg mb-4">
                                    <p className="text-gray-300 mb-2">Predicted Sales</p>
                                    <p className="text-5xl font-bold text-green-400">₹ {prediction.predicted_sales}</p>
                                </div>

                                <div className="text-sm text-gray-400">
                                    <p>Generated at: {new Date(prediction.timestamp).toLocaleString()}</p>
                                </div>

                                <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-700 p-4 rounded-lg">
                                    <p className="text-sm text-blue-300">
                                        💡 <strong>Tip:</strong> This prediction is based on historical data and current market conditions. 
                                        Consider external factors like seasonal trends for better accuracy.
                                    </p>
                                </div>
                            </div>
                        )}

                        {!success && !error && (
                            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">How to use</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>✓ Fill in all the product details</li>
                                    <li>✓ Enter outlet and market information</li>
                                    <li>✓ Click "Get Prediction" to see demand forecast</li>
                                    <li>✓ Use predictions to optimize inventory</li>
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
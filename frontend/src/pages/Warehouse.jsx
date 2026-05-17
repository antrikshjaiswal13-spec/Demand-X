import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Search, Plus, Trash2, Edit2, Package } from 'lucide-react'

function Warehouse() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Dairy Milk 200ml', quantity: 150, location: 'A1', price: 40 },
        { id: 2, name: 'Soft Drink Bottle 1L', quantity: 200, location: 'B2', price: 60 },
        { id: 3, name: 'Snack Pack', quantity: 300, location: 'C3', price: 30 },
        { id: 4, name: 'Frozen Food', quantity: 80, location: 'A5', price: 180 },
        { id: 5, name: 'Meat Premium', quantity: 45, location: 'D2', price: 450 },
        { id: 6, name: 'Rice Bag 5kg', quantity: 120, location: 'E1', price: 350 },
        { id: 7, name: 'Cooking Oil 1L', quantity: 180, location: 'B4', price: 140 },
        { id: 8, name: 'Wheat Flour 10kg', quantity: 90, location: 'C1', price: 420 },
        { id: 9, name: 'Chocolate Cookies', quantity: 250, location: 'A3', price: 90 },
        { id: 10, name: 'Ice Cream Box', quantity: 15, location: 'D5', price: 220 },
        { id: 11, name: 'Mineral Water 2L', quantity: 300, location: 'B1', price: 35 },
        { id: 12, name: 'Instant Noodles Pack', quantity: 500, location: 'C4', price: 25 },
        { id: 13, name: 'Tomato Ketchup 500g', quantity: 140, location: 'A6', price: 110 },
        { id: 14, name: 'Cheese Slices', quantity: 95, location: 'D1', price: 160 },
        { id: 15, name: 'Butter 500g', quantity: 85, location: 'E3', price: 250 },
        { id: 16, name: 'Coffee Powder 250g', quantity: 130, location: 'B5', price: 320 },
        { id: 17, name: 'Green Tea Pack', quantity: 110, location: 'C6', price: 180 },
        { id: 18, name: 'Chicken Sausage', quantity: 30, location: 'D4', price: 280 },
        { id: 19, name: 'Paneer Fresh 1kg', quantity: 75, location: 'A2', price: 360 },
        { id: 20, name: 'Potato Chips Large', quantity: 400, location: 'E5', price: 50 },
        { id: 21, name: 'Energy Drink Can', quantity: 220, location: 'B6', price: 120 },
        { id: 22, name: 'Biscuits Family Pack', quantity: 310, location: 'C2', price: 70 },
        { id: 23, name: 'Frozen Pizza', quantity: 55, location: 'D6', price: 340 },
        { id: 24, name: 'Organic Honey 500g', quantity: 65, location: 'A4', price: 450 },
        { id: 25, name: 'Fruit Juice 1L', quantity: 10, location: 'E2', price: 95 }

    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        location: '',
        price: ''
    })

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddClick = () => {
        setFormData({ name: '', quantity: '', location: '', price: '' })
        setEditingId(null)
        setShowForm(true)
    }

    const handleEditClick = (product) => {
        setFormData(product)
        setEditingId(product.id)
        setShowForm(true)
    }

    const handleSave = () => {
        if (editingId) {
            setProducts(products.map(p =>
                p.id === editingId
                    ? { ...formData, id: editingId }
                    : p
            ))
        } else {
            setProducts([...products, { ...formData, id: Date.now() }])
        }
        setShowForm(false)
    }

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id))
    }

    const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0)
    const lowStockItems = products.filter(p => p.quantity < 50).length

    return (
        <div className="flex bg-slate-900 text-white min-h-screen">
            <Sidebar />
            <div className="ml-64 p-10 w-full">
                <h1 className="text-5xl font-bold mb-10">Warehouse Inventory</h1>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-10">
                    <div className="bg-slate-800 p-6 rounded-2xl">
                        <p className="text-gray-400 mb-1">Total Products</p>
                        <p className="text-3xl font-bold">{products.length}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl">
                        <p className="text-gray-400 mb-1">Total Units</p>
                        <p className="text-3xl font-bold">{products.reduce((sum, p) => sum + p.quantity, 0)}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl">
                        <p className="text-gray-400 mb-1">Inventory Value</p>
                        <p className="text-3xl font-bold">₹{totalValue.toLocaleString()}</p>
                    </div>
                    <div className="bg-red-900 bg-opacity-40 p-6 rounded-2xl border border-red-600">
                        <p className="text-gray-400 mb-1">Low Stock Items</p>
                        <p className="text-3xl font-bold text-red-400">{lowStockItems}</p>
                    </div>
                </div>

                {/* Search and Add Button */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by product name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 transition"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                </div>

                {/* Product Table */}
                <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-700 border-b border-slate-600">
                                <th className="px-6 py-4 text-left">Product Name</th>
                                <th className="px-6 py-4 text-left">Quantity</th>
                                <th className="px-6 py-4 text-left">Location</th>
                                <th className="px-6 py-4 text-left">Price (₹)</th>
                                <th className="px-6 py-4 text-left">Total Value</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700 transition">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <Package size={20} className="text-blue-500" />
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm ${product.quantity < 50 ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono">{product.location}</td>
                                        <td className="px-6 py-4">₹{product.price}</td>
                                        <td className="px-6 py-4 font-bold">₹{(product.quantity * product.price).toLocaleString()}</td>
                                        <td className="px-6 py-4 flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleEditClick(product)}
                                                className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="bg-red-600 hover:bg-red-700 p-2 rounded transition"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Add/Edit Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-slate-800 p-8 rounded-2xl max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-6">
                                {editingId ? 'Edit Product' : 'Add New Product'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter quantity"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="e.g., A1, B2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Price (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter price"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                                >
                                    {editingId ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Warehouse
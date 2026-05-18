import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'

function Dashboard() {

  const [data, setData] = useState({})

  useEffect(() => {

    axios.get('http://127.0.0.1:5000/api/dashboard')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  return (

    <div className="flex w-full min-h-screen text-white" style={{background: 'linear-gradient(135deg, #050a12 0%, #0a1428 50%, #1a0033 100%)'}}>

      <Sidebar />

      <div className="ml-64 p-10 w-full">

        <div className="mb-12">
          <h1 className="text-6xl font-bold gradient-text mb-2">
            Demand-X Dashboard
          </h1>
          <p className="text-gray-400">Real-time insights and analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="card group hover:border-cyan-400">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-400 mb-2">Total Products</h2>
                <p className="text-4xl font-bold text-cyan-400">
                  {data.total_products || '0'}
                </p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
            <div className="mt-4 text-xs text-gray-500">Active inventory</div>
          </div>

          <div className="card group hover:border-green-400">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-400 mb-2">Monthly Sales</h2>
                <p className="text-4xl font-bold text-green-400">
                  ₹ {data.monthly_sales ? data.monthly_sales.toLocaleString() : '0'}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
            <div className="mt-4 text-xs text-gray-500">This month</div>
          </div>

          <div className="card group hover:border-purple-400">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-400 mb-2">Predicted Demand</h2>
                <p className="text-4xl font-bold text-purple-400">
                  ₹ {data.predicted_demand ? data.predicted_demand.toLocaleString() : '0'}
                </p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
            <div className="mt-4 text-xs text-gray-500">Forecast</div>
          </div>

          <div className="card group hover:border-yellow-400">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-400 mb-2">Warehouse Items</h2>
                <p className="text-4xl font-bold text-yellow-400">
                  {data.warehouse_items || '0'}
                </p>
              </div>
              <div className="text-3xl">🏭</div>
            </div>
            <div className="mt-4 text-xs text-gray-500">In stock</div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard
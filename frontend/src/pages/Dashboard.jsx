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

    <div className="flex bg-slate-900 min-h-screen text-white">

      <Sidebar />

      <div className="ml-64 p-10 w-full">

        <h1 className="text-5xl font-bold mb-10">
          Demand-X Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl mb-2">Total Products</h2>
            <p className="text-3xl font-bold">
              {data.total_products}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl mb-2">Monthly Sales</h2>
            <p className="text-3xl font-bold">
              ₹ {data.monthly_sales}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl mb-2">Predicted Demand</h2>
            <p className="text-3xl font-bold">
              ₹ {data.predicted_demand}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl mb-2">Warehouse Items</h2>
            <p className="text-3xl font-bold">
              {data.warehouse_items}
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard
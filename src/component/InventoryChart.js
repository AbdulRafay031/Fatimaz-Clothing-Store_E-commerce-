"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InventoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/admin/inventory-chart")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Chart fetch failed:", err));
  }, []);

  return (
    <div className="w-full mt-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
        Inventory Overview
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="inventory"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

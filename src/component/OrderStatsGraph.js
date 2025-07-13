"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black p-2 rounded shadow border text-sm">
        <p className="font-semibold">{label}</p>
        <p>{`Orders: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function OrderStatsGraph({ stats }) {
  const [selectedRange, setSelectedRange] = useState("All Time");

  const data = [
    { name: "Total", value: stats.total },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Remaining", value: stats.remaining },
    { name: "Cancelled", value: stats.cancelled },
    { name: "Returned", value: stats.returned },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-black">
          📊 Order Overview
        </h2>
        {/* Optional Filter Dropdown */}
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="text-sm bg-gray-100 border border-black rounded px-2 py-1 text-black"
        >
          <option>All Time</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="w-full h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

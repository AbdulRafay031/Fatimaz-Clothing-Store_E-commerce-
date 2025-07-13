import Link from "next/link";
import {
  LayoutList,
  PackageCheck,
  XCircle,
  Clock,
  RotateCcw,
} from "lucide-react";
import Footer from "@/component/footer";
import AdminNavbar from "../../component/Admin-navbar";
import InventoryChart from "../../component/InventoryChart";
import OrderStatsGraph from "../../component/OrderStatsGraph";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    remaining: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("/api/order/Get");
      const orders = res.data;

      const total = orders.length;
      const confirmed = orders.filter((o) => o.status === "delivered").length;
      const remaining = orders.filter((o) => o.status !== "delivered").length;
      const cancelled = orders.filter((o) => o.status === "cancelled").length;

      setStats({ total, confirmed, remaining, cancelled });
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AdminNavbar />

      <main className="relative flex flex-col items-center justify-center flex-1 pt-16">
        <h1 className="text-6xl font-bold text-center mt-6 mb-10 text-black">
          Fatimaz Dashboard
        </h1>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Total Orders */}
          <Link href="/admin/Total-Order">
            <div className="flex flex-col items-center text-center hover:scale-105 transition cursor-pointer">
              <LayoutList className="w-12 h-12 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Total Orders
              </span>
            </div>
          </Link>

          {/* Confirmed Delivery */}
          <Link href="/admin/Confirm-Deliver">
            <div className="flex flex-col items-center text-center hover:scale-105 transition cursor-pointer">
              <PackageCheck className="w-12 h-12 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Confirmed Delivery
              </span>
            </div>
          </Link>

          {/* Cancelled Orders */}
          <Link href="/admin/Cencellation">
            <div className="flex flex-col items-center text-center hover:scale-105 transition cursor-pointer">
              <XCircle className="w-12 h-12 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Cancelled Orders
              </span>
            </div>
          </Link>

          {/* Remaining Orders */}
          <Link href="/admin/Remaining-Order">
            <div className="flex flex-col items-center text-center hover:scale-105 transition cursor-pointer">
              <Clock className="w-12 h-12 text-yellow-500 mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Remaining Orders
              </span>
            </div>
          </Link>

          {/* Return Order */}

          <Link href="/admin/Return-Requests">
            <div className="flex flex-col items-center text-center hover:scale-105 transition cursor-pointer">
              <RotateCcw className="w-12 h-12 text-purple-500 mb-2" />
              <span className="text-sm font-medium text-gray-800">
                Return Orders
              </span>
            </div>
          </Link>
        </div>

        <InventoryChart />
        <OrderStatsGraph stats={stats} />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

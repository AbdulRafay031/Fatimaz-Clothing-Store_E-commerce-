import { PackageCheck, Package, Clock, XCircle, RotateCcw } from "lucide-react";
import Navbar from "../../component/navbar";
import Link from "next/link";
import Footer from "../../component/footer";

export default function AccountOrders() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          My Orders
        </h2>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {/* Total Delivered */}
          <Link
            href="/UserPanel/Deliver-Order"
            className="bg-gray-900 text-white p-4 rounded-2xl shadow hover:scale-105 transition block"
          >
            <PackageCheck className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <p className="text-sm font-medium">Total Delivered</p>
          </Link>

          {/* Current Orders */}
          <Link
            href="/UserPanel/Current-Order"
            className="bg-gray-900 text-white p-4 rounded-2xl shadow hover:scale-105 transition block"
          >
            <Package className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="text-sm font-medium">Current Orders</p>
          </Link>

          {/* Remaining Orders */}
          <Link
            href="/UserPanel/Remaining-Order"
            className="bg-gray-900 text-white p-4 rounded-2xl shadow hover:scale-105 transition block"
          >
            <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <p className="text-sm font-medium">Remaining Orders</p>
          </Link>

          {/* Cancellations */}
          <Link
            href="/UserPanel/Cencellation"
            className="bg-gray-900 text-white p-4 rounded-2xl shadow hover:scale-105 transition block"
          >
            <XCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
            <p className="text-sm font-medium">Cancellations</p>
          </Link>

          {/* Return Orders */}
          <Link
            href="/UserPanel/Return-Order"
            className="bg-gray-900 text-white p-4 rounded-2xl shadow hover:scale-105 transition block"
          >
            <RotateCcw className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <p className="text-sm font-medium">Return Orders</p>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import { useState } from "react";
import {
  PackageCheck,
  CheckCircle,
  Clock,
  Ban,
  Menu,
  X,
  User,
   RotateCcw,
  
} from "lucide-react";

const navItems = [
  {
    label: "Total Order",
    href: "/UserPanel/Current-Order",
    icon: <PackageCheck size={18} />,
  },
  {
    label: "Confirm Delivery",
    href: "/UserPanel/Deliver-Order",
    icon: <CheckCircle size={18} />,
  },
  {
    label: "Remaining Order",
    href: "/UserPanel/Remaining-Order",
    icon: <Clock size={18} />,
  },
  {
    label: "Cancellation",
    href: "/UserPanel/Cencellation",
    icon: <Ban size={18} />,
  },
  {
    label: "Return Orders",
    href: "/UserPanel/Return-Order",
    icon: <RotateCcw size={18} />,
  },
  {
    label: "UserPanel",
    href: "/UserPanel/account",
    icon: <User size={18} />,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-1 hover:text-yellow-400"
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-900">
          {navItems.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 text-white hover:text-yellow-400"
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

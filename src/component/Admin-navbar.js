"use client";

import { Menu, PlusCircle, LayoutList, ImagePlus, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    alert("Logged out");
  };

  return (
    <nav className="bg-black text-white w-full shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 shrink-0">
          <Image
            src="/logo13.png"
            width={150}
            height={50}
            className="h-16"
            alt="Fatimaz Logo"
          />
          {/* <span className="text-2xl font-semibold">FAT</span> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <NavItem
            icon={<PlusCircle className="w-5 h-5" />}
            label="Add Product"
            onClick={() => router.push("/admin/Addnewproduct")}
          />
          <NavItem
            icon={<LayoutList className="w-5 h-5" />}
            label="Manage Products"
            onClick={() => router.push("/admin/Manageproduct")}
          />
          <NavItem
            icon={<ImagePlus className="w-5 h-5" />}
            label="Add Banner Image"
            onClick={() => router.push("/admin/Addbannerimg")}
          />
          <NavItem
            icon={<LogOut className="w-5 h-5" />}
            label="Logout"
            onClick={handleLogout}
          />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium">
          <NavItem
            icon={<PlusCircle className="w-5 h-5 inline" />}
            label="Add Product"
            onClick={() => router.push("/admin/Addnewproduct")}
          />
          <NavItem
            icon={<LayoutList className="w-5 h-5 inline" />}
            label="Manage Products"
            onClick={() => router.push("/admin/Manageproduct")}
          />
          <NavItem
            icon={<ImagePlus className="w-5 h-5 inline" />}
            label="Add Banner Image"
            onClick={() => router.push("/admin/Addbannerimg")}
          />
          <NavItem
            icon={<LogOut className="w-5 h-5 inline" />}
            label="Logout"
            onClick={handleLogout}
          />
        </div>
      )}
    </nav>
  );
}

// Reusable nav item
function NavItem({ icon, label, onClick }) {
  return (
    <div
      className="flex items-center gap-2 hover:text-gray-300 cursor-pointer transition"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

"use client";
import { useState } from "react";
import Sidebar from "@/components/DashboardSideBar";
import Navbar from "@/components/DashboardNavBar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar always takes the full height */}
      <div className={`h-full ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content section, including the navbar and page content */}
      <div className="flex flex-col flex-grow">
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Main content area */}
        <main className="flex-grow p-6 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

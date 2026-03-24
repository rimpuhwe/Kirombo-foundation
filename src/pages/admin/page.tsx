import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DashboardHome from "./Dashboard/DashboardHome";
import Settings from "./Dashboard/Settings";
import BlogManager from "./Dashboard/BlogManager";
import PostsManager from "./Dashboard/PostsManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "blog" | "posts" | "settings"
  >("dashboard");

  return (
    <div className="flex min-h-screen bg-[#f4f6fa] dark:bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 ml-[110px]">
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "blog" && <BlogManager />}
        {activeTab === "posts" && <PostsManager />}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
};

export default AdminDashboard;

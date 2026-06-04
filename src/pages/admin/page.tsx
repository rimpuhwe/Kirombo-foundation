import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DashboardHome from "./Dashboard/DashboardHome";
import Settings from "./Dashboard/Settings";
import BlogManager from "./Dashboard/BlogManager";
import PostsManager from "./Dashboard/PostsManager";

type Tab = "overview" | "writing" | "blogs" | "settings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const handleTabChange = (tab: Tab) => {
    if (tab !== "writing") setEditingPostId(null);
    setActiveTab(tab);
  };

  const handleEditPost = (id: string) => {
    setEditingPostId(id);
    setActiveTab("writing");
  };

  const handleEditorDone = () => {
    setEditingPostId(null);
    setActiveTab("blogs");
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6fa] dark:bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="flex-1 p-8 ml-[110px]">
        {activeTab === "overview" && <DashboardHome />}
        {activeTab === "writing" && (
          <BlogManager editingPostId={editingPostId} onDone={handleEditorDone} />
        )}
        {activeTab === "blogs" && <PostsManager onEdit={handleEditPost} />}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
};

export default AdminDashboard;

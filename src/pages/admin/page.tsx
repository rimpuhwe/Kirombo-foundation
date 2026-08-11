import React, { useState } from "react";
import Sidebar, { type AdminTab } from "../../components/admin/Sidebar";
import DashboardHome from "./Dashboard/DashboardHome";
import Settings from "./Dashboard/Settings";
import BlogManager from "./Dashboard/BlogManager";
import PostsManager from "./Dashboard/PostsManager";
import WritersManager from "./Dashboard/WritersManager";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const handleTabChange = (tab: AdminTab) => {
    if (tab !== "writing") setEditingPostId(null);
    if (tab === "writers" && !isAdmin) return;
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
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} isAdmin={isAdmin} />
      <main className="flex-1 p-8 ml-[110px]">
        {activeTab === "overview" && <DashboardHome />}
        {activeTab === "writing" && (
          <BlogManager editingPostId={editingPostId} onDone={handleEditorDone} />
        )}
        {activeTab === "blogs" && <PostsManager onEdit={handleEditPost} />}
        {activeTab === "writers" && isAdmin && <WritersManager />}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
};

export default AdminDashboard;

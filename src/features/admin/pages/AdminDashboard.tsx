import React, { useState } from "react";
import Sidebar, { type AdminTab } from "@/features/admin/components/Sidebar";
import DashboardHome from "@/features/admin/components/DashboardHome";
import Settings from "@/features/admin/components/Settings";
import BlogManager from "@/features/admin/components/BlogManager";
import PostsManager from "@/features/admin/components/PostsManager";
import WritersManager from "@/features/admin/components/WritersManager";
import { useAuth } from "@/features/auth/AuthContext";

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

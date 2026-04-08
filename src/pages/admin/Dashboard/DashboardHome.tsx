import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MessageSquare, Heart, BookOpen } from "lucide-react";
import { useStats, useActivities, usePosts } from "@/hooks/useData";

const DashboardHome = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const { data: stats, loading: statsLoading } = useStats();
  const { data: activities, loading: activitiesLoading } = useActivities();
  const { data: posts, loading: postsLoading } = usePosts();

  // Update date/time every second
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: number | undefined }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
          {statsLoading ? (
            <Skeleton className="w-16 h-8 mt-1" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value || 0}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Welcome back to your blog management hub</p>
        </div>
        <span className="text-lg text-gray-500 dark:text-gray-400">
          {dateTime || <Skeleton className="w-40 h-6" />}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Eye} label="Total Views" value={stats?.totalViews} />
        <StatCard icon={BookOpen} label="Total Posts" value={stats?.totalPosts} />
        <StatCard icon={Heart} label="Total Likes" value={stats?.totalLikes} />
        <StatCard icon={MessageSquare} label="Total Comments" value={stats?.totalComments} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Blog Performance</h2>
          {postsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stats?.totalPosts || 0}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Published</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{stats?.publishedPosts || 0}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Drafts</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{stats?.draftPosts || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Average Views/Post</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {stats?.totalPosts && stats?.totalViews ? Math.round(stats.totalViews / stats.totalPosts) : 0}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          {activitiesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : activities && activities.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 pb-3 border-b dark:border-gray-700 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type.includes("publish") || activity.type.includes("post") ? "bg-green-500" :
                    activity.type.includes("draft") || activity.type.includes("save") ? "bg-blue-500" :
                    "bg-orange-500"
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

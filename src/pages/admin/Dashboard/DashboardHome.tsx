import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MessageSquare, Heart, BookOpen } from "lucide-react";

interface Stats {
  blogClicks: number;
  monthlyOpens: number;
  likes: number;
  comments: number;
}

const DashboardHome = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const [stats, setStats] = useState<Stats>({
    blogClicks: 2847,
    monthlyOpens: 156,
    likes: 543,
    comments: 89,
  });
  const [loading, setLoading] = useState(false);

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

  const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: number }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
          {loading ? (
            <Skeleton className="w-16 h-8 mt-1" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
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
        <StatCard icon={Eye} label="Total Views" value={stats.blogClicks} />
        <StatCard icon={BookOpen} label="Monthly Opens" value={stats.monthlyOpens} />
        <StatCard icon={Heart} label="Total Likes" value={stats.likes} />
        <StatCard icon={MessageSquare} label="Total Comments" value={stats.comments} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Blog Performance</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
              <span className="font-semibold text-gray-900 dark:text-white">24</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Published</span>
              <span className="font-semibold text-green-600 dark:text-green-400">18</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Drafts</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Average Views/Post</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">158</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-700">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New post published</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-700">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Draft saved</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Profile updated</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

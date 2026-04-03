import React, { useEffect, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useStatsQuery, useDailyStatsQuery } from "@/hooks/useStatsQuery";
import { useActivityLogQuery } from "@/hooks/usePostsQuery";
import { subscribeToStats, subscribeToActivities } from "@/services/websocket";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Stats {
  blogClicks: number;
  monthlyOpens: number;
  likes: number;
  comments: number;
  publishedPosts?: number;
  draftPosts?: number;
}

const StatCard = ({
  label,
  value,
  loading,
}: {
  label: string;
  value: number | string;
  loading: boolean;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center min-h-[120px]">
    {loading ? (
      <Skeleton className="w-12 h-8 mb-2" />
    ) : (
      <span className="text-3xl font-bold text-blue-600">{value}</span>
    )}
    <span className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium">{label}</span>
  </div>
);

// Mock data for preview
const mockDailyStats = [
  { date: "Jan 1", created: 2, published: 1 },
  { date: "Jan 2", created: 3, published: 2 },
  { date: "Jan 3", created: 1, published: 1 },
  { date: "Jan 4", created: 4, published: 3 },
  { date: "Jan 5", created: 2, published: 2 },
  { date: "Jan 6", created: 5, published: 4 },
  { date: "Jan 7", created: 3, published: 2 },
];

const mockActivities = [
  { id: 1, type: "publish", message: "Published 'Getting Started with React'", createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: 2, type: "create", message: "Created draft 'Advanced TypeScript Patterns'", createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 3, type: "publish", message: "Published 'Web Performance Tips'", createdAt: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: 4, type: "create", message: "Created draft 'Testing Best Practices'", createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
];

const DashboardHome = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const [stats, setStats] = useState<Stats>({
    blogClicks: 2847,
    monthlyOpens: 12,
    likes: 356,
    comments: 89,
    publishedPosts: 8,
    draftPosts: 3,
  });
  const [dateRange, setDateRange] = useState<"7" | "30" | "90">("30");
  const [dailyStats] = useState(mockDailyStats);
  const [activityLog] = useState(mockActivities);

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

  // Filter daily stats based on date range
  const filteredDailyStats = useCallback(() => {
    const days = parseInt(dateRange);
    return dailyStats.slice(Math.max(0, dailyStats.length - days));
  }, [dailyStats, dateRange]);

  // Prepare pie chart data for draft vs published
  const pieData = [
    { name: "Published", value: stats?.publishedPosts || 0, fill: "#10b981" },
    { name: "Draft", value: stats?.draftPosts || 0, fill: "#f59e0b" },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <span className="text-lg text-gray-500 dark:text-gray-400">
          {dateTime || <Skeleton className="w-32 h-6" />}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Views" value={stats.blogClicks} loading={false} />
        <StatCard label="Total Posts" value={stats.monthlyOpens} loading={false} />
        <StatCard label="Likes" value={stats.likes} loading={false} />
        <StatCard label="Comments" value={stats.comments} loading={false} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - Posts Over Time */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Posts Created (Last {dateRange} Days)</h2>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as "7" | "30" | "90")}
              className="border rounded px-3 py-1 text-sm dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredDailyStats()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#3b82f6"
                name="Created"
              />
              <Line
                type="monotone"
                dataKey="published"
                stroke="#10b981"
                name="Published"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Draft vs Published */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Post Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activityLog.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No recent activity
            </p>
          ) : (
            activityLog.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 py-2 border-b dark:border-gray-700 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {activity.message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  activity.type === "publish" 
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200" 
                    : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                }`}>
                  {activity.type === "publish" ? "Published" : "Created"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

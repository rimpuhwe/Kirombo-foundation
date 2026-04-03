import React, { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  blogClicks: number;
  monthlyOpens: number;
  likes: number;
  comments: number;
}

const DashboardHome = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);

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

  // WebSocket for real-time stats
  useEffect(() => {
    setLoading(true);
    // Replace with your WebSocket endpoint
    const ws = new window.WebSocket("wss://your-websocket-endpoint");
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "subscribe", topic: "blog-stats" }));
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "blog-stats") {
          setStats(data.payload);
          setLoading(false);
        }
      } catch {}
    };
    ws.onerror = () => setLoading(false);
    ws.onclose = () => {};
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span id="current-date-time" className="text-lg text-gray-500">
          {dateTime || <Skeleton className="w-32 h-6" />}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Blog Clicks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center min-h-[120px]">
          {loading ? (
            <Skeleton className="w-12 h-8 mb-2" />
          ) : (
            <span className="text-3xl font-bold">{stats?.blogClicks ?? 0}</span>
          )}
          <span className="text-gray-500 mt-2">Blog Clicks</span>
        </div>
        {/* Monthly Opens */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center min-h-[120px]">
          {loading ? (
            <Skeleton className="w-12 h-8 mb-2" />
          ) : (
            <span className="text-3xl font-bold">
              {stats?.monthlyOpens ?? 0}
            </span>
          )}
          <span className="text-gray-500 mt-2">Monthly Opens</span>
        </div>
        {/* Likes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center min-h-[120px]">
          {loading ? (
            <Skeleton className="w-12 h-8 mb-2" />
          ) : (
            <span className="text-3xl font-bold">{stats?.likes ?? 0}</span>
          )}
          <span className="text-gray-500 mt-2">Likes</span>
        </div>
        {/* Comments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center min-h-[120px]">
          {loading ? (
            <Skeleton className="w-12 h-8 mb-2" />
          ) : (
            <span className="text-3xl font-bold">{stats?.comments ?? 0}</span>
          )}
          <span className="text-gray-500 mt-2">Comments</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

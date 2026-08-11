import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Heart, BookOpen, FileEdit, type LucideIcon } from "lucide-react";
import { useArticles } from "@/hooks/useArticles";

const DashboardHome = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const { data: articles, loading } = useArticles();

  useEffect(() => {
    const update = () => setDateTime(new Date().toLocaleString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const published = articles?.filter((a) => a.status === "published") ?? [];
  const drafts = articles?.filter((a) => a.status === "draft") ?? [];
  const totalViews = articles?.reduce((sum, a) => sum + a.view_count, 0) ?? 0;
  const totalLikes = articles?.reduce((sum, a) => sum + a.like_count, 0) ?? 0;
  const recentlyUpdated = [...(articles ?? [])]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  const StatCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: LucideIcon;
    label: string;
    value: number | undefined;
  }) => (
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
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value ?? 0}</p>
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
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Welcome back to your press room hub</p>
        </div>
        <span className="text-lg text-gray-500 dark:text-gray-400">
          {dateTime || <Skeleton className="w-40 h-6" />}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={BookOpen} label="Total Articles" value={articles?.length} />
        <StatCard icon={FileEdit} label="Drafts" value={drafts.length} />
        <StatCard icon={Eye} label="Total Views" value={totalViews} />
        <StatCard icon={Heart} label="Total Likes" value={totalLikes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Article Performance</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Total Articles</span>
                <span className="font-semibold text-gray-900 dark:text-white">{articles?.length ?? 0}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Published</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{published.length}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Drafts</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{drafts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Average Views/Article</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {articles?.length ? Math.round(totalViews / articles.length) : 0}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recently Updated</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : recentlyUpdated.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentlyUpdated.map((article) => (
                <div key={article.id} className="flex items-center gap-3 pb-3 border-b dark:border-gray-700 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${article.status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{article.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(article.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No articles yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

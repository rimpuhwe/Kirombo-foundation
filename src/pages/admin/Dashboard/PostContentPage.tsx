import React from "react";
import { Calendar, ArrowLeft } from "lucide-react";

interface PostContentPageProps {
  post: {
    title: string;
    description: string;
    content: string;
    createdAt: string;
    status: "posted" | "draft";
  };
  onBack: () => void;
}

const PostContentPage: React.FC<PostContentPageProps> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
          <Calendar size={16} className="text-primary" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span
            className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${post.status === "posted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
          >
            {post.status === "posted" ? "Posted" : "Draft"}
          </span>
        </div>
        <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default PostContentPage;

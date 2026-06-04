const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string | null;
  category?: string | null;
  status: "draft" | "published";
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
}

export interface Activity {
  id: string;
  type: string;
  postId?: string;
  message: string;
  createdAt: string;
}

function normalizePost(raw: any): Post {
  return {
    ...raw,
    status: (raw.status as string).toLowerCase() as "draft" | "published",
  };
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const options: RequestInit = { method, headers };

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || error.error || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Posts API
  async getPosts(status?: "DRAFT" | "PUBLISHED"): Promise<Post[]> {
    const query = status ? `?status=${status}` : "";
    const raw = await this.request<any[]>("GET", `/posts${query}`);
    return raw.map(normalizePost);
  }

  async getPost(id: string): Promise<Post> {
    const raw = await this.request<any>("GET", `/posts/${id}`);
    return normalizePost(raw);
  }

  async createPost(data: Omit<Post, "id" | "createdAt" | "updatedAt" | "views" | "likes">): Promise<Post> {
    const payload = { ...data, status: data.status.toUpperCase() };
    const raw = await this.request<any>("POST", "/posts", payload);
    return normalizePost(raw);
  }

  async updatePost(id: string, data: Partial<Omit<Post, "id" | "createdAt" | "updatedAt" | "views" | "likes">>): Promise<Post> {
    const payload = data.status ? { ...data, status: data.status.toUpperCase() } : data;
    const raw = await this.request<any>("PUT", `/posts/${id}`, payload);
    return normalizePost(raw);
  }

  async deletePost(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("DELETE", `/posts/${id}`);
  }

  async recordView(id: string): Promise<Post> {
    const raw = await this.request<any>("POST", `/posts/${id}/view`);
    return normalizePost(raw);
  }

  async likePost(id: string): Promise<Post> {
    const raw = await this.request<any>("POST", `/posts/${id}/like`);
    return normalizePost(raw);
  }

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Image upload failed");
    const result = await response.json();
    const files: string[] = result?.data?.files ?? result?.files ?? [];
    if (!files.length) throw new Error("No URL returned from upload");
    return files[0];
  }

  // Stats API
  async getStats(): Promise<Stats> {
    return this.request<Stats>("GET", "/stats");
  }

  async getPostsOverTime(days = 30): Promise<Array<{ date: string; count: number }>> {
    return this.request<Array<{ date: string; count: number }>>(
      "GET",
      `/stats/posts-over-time?days=${days}`
    );
  }

  async getTopPosts(limit = 10): Promise<Post[]> {
    const raw = await this.request<any[]>("GET", `/stats/top-posts?limit=${limit}`);
    return raw.map(normalizePost);
  }

  // Activities API
  async getActivities(limit = 20): Promise<Activity[]> {
    return this.request<Activity[]>("GET", `/activities?limit=${limit}`);
  }

  async getPostActivities(postId: string): Promise<Activity[]> {
    return this.request<Activity[]>("GET", `/activities/post/${postId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export { API_BASE_URL };

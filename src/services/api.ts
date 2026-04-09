const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  status: "draft" | "published";
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
  id: number;
  type: string;
  postId?: number;
  message: string;
  createdAt: string;
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
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Posts API
  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>("GET", "/posts");
  }

  async getPost(id: number): Promise<Post> {
    return this.request<Post>("GET", `/posts/${id}`);
  }

  async createPost(data: Omit<Post, "id" | "createdAt" | "updatedAt">): Promise<Post> {
    return this.request<Post>("POST", "/posts", data);
  }

  async updatePost(
    id: number,
    data: Partial<Omit<Post, "id" | "createdAt" | "updatedAt">>
  ): Promise<Post> {
    return this.request<Post>("PUT", `/posts/${id}`, data);
  }

  async deletePost(id: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>("DELETE", `/posts/${id}`);
  }

  async recordView(id: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>("POST", `/posts/${id}/view`);
  }

  async likePost(id: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>("POST", `/posts/${id}/like`);
  }

  // Stats API
  async getStats(): Promise<Stats> {
    return this.request<Stats>("GET", "/stats");
  }

  async getPostsOverTime(days: number = 30): Promise<Array<{ date: string; count: number }>> {
    return this.request<Array<{ date: string; count: number }>>(
      "GET",
      `/stats/posts-over-time?days=${days}`
    );
  }

  async getTopPosts(limit: number = 10): Promise<Post[]> {
    return this.request<Post[]>("GET", `/stats/top-posts?limit=${limit}`);
  }

  // Activities API
  async getActivities(limit: number = 20): Promise<Activity[]> {
    return this.request<Activity[]>("GET", `/activities?limit=${limit}`);
  }

  async getPostActivities(postId: number): Promise<Activity[]> {
    return this.request<Activity[]>("GET", `/activities/post/${postId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

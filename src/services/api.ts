const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
  comments?: number;
}

export interface Stats {
  blogClicks: number;
  monthlyOpens: number;
  likes: number;
  comments: number;
  publishedPosts?: number;
  draftPosts?: number;
}

export interface Activity {
  id: number;
  type: string;
  postId: number;
  message: string;
  createdAt: string;
}

// Posts API
export const postsAPI = {
  async getAll(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  async getById(id: number): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  async create(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  async update(
    id: number,
    data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  },

  async getActivityLog(): Promise<Activity[]> {
    const response = await fetch(`${API_BASE_URL}/posts/activity/log`);
    if (!response.ok) throw new Error('Failed to fetch activity log');
    return response.json();
  },
};

// Stats API
export const statsAPI = {
  async getOverall(): Promise<Stats> {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async getDaily(): Promise<Array<{ date: string; created: number; published: number }>> {
    const response = await fetch(`${API_BASE_URL}/stats/daily`);
    if (!response.ok) throw new Error('Failed to fetch daily stats');
    return response.json();
  },

  async getPostStats(): Promise<
    Array<{ id: number; title: string; views: number; likes: number; comments: number }>
  > {
    const response = await fetch(`${API_BASE_URL}/stats/posts`);
    if (!response.ok) throw new Error('Failed to fetch post stats');
    return response.json();
  },

  async recordView(postId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/stats/${postId}/view`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to record view');
  },

  async like(postId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/stats/${postId}/like`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to record like');
  },

  async comment(postId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/stats/${postId}/comment`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to record comment');
  },
};

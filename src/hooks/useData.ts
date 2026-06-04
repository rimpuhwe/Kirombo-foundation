import { useState, useEffect, useCallback } from "react";
import { apiClient, Post, Stats, Activity } from "@/services/api";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function usePosts(status?: "DRAFT" | "PUBLISHED") {
  const [state, setState] = useState<AsyncState<Post[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await apiClient.getPosts(status);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, [status]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function usePost(id: string) {
  const [state, setState] = useState<AsyncState<Post>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetch = useCallback(async () => {
    if (!id) return;
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await apiClient.getPost(id);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function useCreatePost() {
  const [state, setState] = useState<AsyncState<Post>>({
    data: null,
    loading: false,
    error: null,
  });

  const create = useCallback(
    async (postData: Omit<Post, "id" | "createdAt" | "updatedAt" | "views" | "likes">) => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const data = await apiClient.createPost(postData);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        setState({ data: null, loading: false, error: err });
        throw err;
      }
    },
    []
  );

  return { ...state, create };
}

export function useUpdatePost(id: string) {
  const [state, setState] = useState<AsyncState<Post>>({
    data: null,
    loading: false,
    error: null,
  });

  const update = useCallback(
    async (postData: Partial<Omit<Post, "id" | "createdAt" | "updatedAt" | "views" | "likes">>) => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const data = await apiClient.updatePost(id, postData);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        setState({ data: null, loading: false, error: err });
        throw err;
      }
    },
    [id]
  );

  return { ...state, update };
}

export function useDeletePost() {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
  });

  const deletePost = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      await apiClient.deletePost(id);
      setState({ loading: false, error: null });
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
      throw error;
    }
  }, []);

  return { ...state, deletePost };
}

export function useStats() {
  const [state, setState] = useState<AsyncState<Stats>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await apiClient.getStats();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function useActivities() {
  const [state, setState] = useState<AsyncState<Activity[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await apiClient.getActivities();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

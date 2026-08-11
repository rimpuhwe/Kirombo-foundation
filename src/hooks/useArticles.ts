import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Article,
  ArticleInput,
  ArticleStatus,
  createArticle,
  deleteArticle,
  getArticleById,
  listArticles,
  setArticleStatus,
  updateArticle,
} from "@/lib/articles";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function asError(error: unknown): Error {
  return error instanceof Error ? error : new Error("Unknown error");
}

export function useArticles(status?: ArticleStatus) {
  const [state, setState] = useState<AsyncState<Article[]>>({ data: null, loading: true, error: null });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await listArticles(status);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: asError(error) });
    }
  }, [status]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function useArticle(id: string | null | undefined) {
  const [state, setState] = useState<AsyncState<Article>>({ data: null, loading: false, error: null });

  const fetch = useCallback(async () => {
    if (!id) return;
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await getArticleById(id);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: asError(error) });
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function useCreateArticle() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const create = useCallback(
    async (input: ArticleInput, status: ArticleStatus) => {
      if (!user) throw new Error("You must be signed in to create an article");
      setLoading(true);
      try {
        return await createArticle(input, status, user.id);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return { create, loading };
}

export function useUpdateArticle(id: string) {
  const [loading, setLoading] = useState(false);

  const update = useCallback(
    async (input: Partial<ArticleInput>, status?: ArticleStatus) => {
      setLoading(true);
      try {
        return await updateArticle(id, input, status);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  return { update, loading };
}

export function useDeleteArticle() {
  const [loading, setLoading] = useState(false);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await deleteArticle(id);
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteArticle: remove, loading };
}

export function useSetArticleStatus() {
  const [loading, setLoading] = useState(false);

  const setStatus = useCallback(async (id: string, status: ArticleStatus) => {
    setLoading(true);
    try {
      return await setArticleStatus(id, status);
    } finally {
      setLoading(false);
    }
  }, []);

  return { setStatus, loading };
}

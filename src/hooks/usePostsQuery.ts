import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsAPI, Post } from '@/services/api';

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postsAPI.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePostQuery = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postsAPI.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) =>
      postsAPI.create(data),
    onSuccess: (newPost) => {
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // Add new post to cache
      queryClient.setQueryData(['posts', newPost.id], newPost);
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>;
    }) => postsAPI.update(id, data),
    onSuccess: (updatedPost) => {
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // Update cache for specific post
      queryClient.setQueryData(['posts', updatedPost.id], updatedPost);
    },
    onError: (error) => {
      console.error('Failed to update post:', error);
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postsAPI.delete(id),
    onSuccess: () => {
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });
};

export const useActivityLogQuery = () => {
  return useQuery({
    queryKey: ['activity-log'],
    queryFn: () => postsAPI.getActivityLog(),
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

import prisma from "../lib/db.js";
import { sanitizeHtml } from "../lib/validation.js";
import { PostStatus } from "@prisma/client";

export class PostService {
  async createPost(data: {
    title: string;
    description: string;
    content: string;
    coverImage?: string;
    category?: string;
    status: PostStatus;
  }) {
    const post = await prisma.post.create({
      data: {
        title: data.title.trim(),
        description: data.description.trim(),
        content: sanitizeHtml(data.content),
        coverImage: data.coverImage || null,
        category: data.category?.trim() || null,
        status: data.status,
      },
    });

    return post;
  }

  async getAllPosts(filters?: { status?: PostStatus; startDate?: Date; endDate?: Date }) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    return prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: { activities: true },
    });
  }

  async updatePost(
    id: string,
    data: {
      title?: string;
      description?: string;
      content?: string;
      coverImage?: string | null;
      category?: string | null;
      status?: PostStatus;
    }
  ) {
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title.trim();
    if (data.description !== undefined) updateData.description = data.description.trim();
    if (data.content !== undefined) updateData.content = sanitizeHtml(data.content);
    if (data.status !== undefined) updateData.status = data.status;
    if ("coverImage" in data) updateData.coverImage = data.coverImage ?? null;
    if ("category" in data) updateData.category = data.category?.trim() ?? null;

    return prisma.post.update({ where: { id }, data: updateData });
  }

  async deletePost(id: string) {
    return prisma.post.delete({ where: { id } });
  }

  async incrementViews(id: string) {
    return prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  async incrementLikes(id: string) {
    return prisma.post.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
  }
}

export default new PostService();

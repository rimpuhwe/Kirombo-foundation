import prisma from "../lib/db.js";
import { sanitizeHtml } from "../lib/validation.js";
import { PostStatus } from "@prisma/client";

export class PostService {
  async createPost(data: {
    title: string;
    description: string;
    content: string;
    status: PostStatus;
  }) {
    const sanitizedContent = sanitizeHtml(data.content);

    const post = await prisma.post.create({
      data: {
        title: data.title.trim(),
        description: data.description.trim(),
        content: sanitizedContent,
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
      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return posts;
  }

  async getPostById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { activities: true },
    });

    return post;
  }

  async updatePost(
    id: string,
    data: {
      title?: string;
      description?: string;
      content?: string;
      status?: PostStatus;
    }
  ) {
    const updateData: any = {};

    if (data.title) updateData.title = data.title.trim();
    if (data.description) updateData.description = data.description.trim();
    if (data.content) updateData.content = sanitizeHtml(data.content);
    if (data.status) updateData.status = data.status;

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return post;
  }

  async deletePost(id: string) {
    const post = await prisma.post.delete({
      where: { id },
    });

    return post;
  }

  async incrementViews(id: string) {
    const post = await prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return post;
  }

  async incrementLikes(id: string) {
    const post = await prisma.post.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return post;
  }
}

export default new PostService();

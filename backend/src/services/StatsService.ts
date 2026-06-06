import prisma from "../lib/db.js";

export class StatsService {
  async getOverallStats() {
    const [totalPosts, totalViews, totalLikes, draftCount, publishedCount] = await Promise.all([
      prisma.post.count(),
      prisma.post.aggregate({ _sum: { views: true } }),
      prisma.post.aggregate({ _sum: { likes: true } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
    ]);

    return {
      totalPosts,
      totalViews: totalViews._sum.views || 0,
      totalLikes: totalLikes._sum.likes || 0,
      draftCount,
      publishedCount,
    };
  }

  async getPostsOverTime(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const posts = await prisma.post.findMany({
      where: {
        createdAt: { gte: startDate },
      },
      select: { createdAt: true, status: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by date
    const grouped: Record<string, { created: number; published: number }> = {};

    posts.forEach((post) => {
      const date = post.createdAt.toISOString().split("T")[0];
      if (!grouped[date]) {
        grouped[date] = { created: 0, published: 0 };
      }
      grouped[date].created += 1;
      if (post.status === "PUBLISHED") {
        grouped[date].published += 1;
      }
    });

    return Object.entries(grouped).map(([date, data]) => ({
      date,
      ...data,
    }));
  }

  async getViewsPerPost() {
    const posts = await prisma.post.findMany({
      select: { id: true, title: true, views: true },
      orderBy: { views: "desc" },
      take: 10,
    });

    return posts;
  }

  async getDraftVsPublished() {
    const [drafted, published] = await Promise.all([
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
    ]);

    return { drafted, published };
  }

  async getComprehensiveStats(days: number = 30) {
    const [overall, postsOverTime, viewsPerPost, draftVsPublished] = await Promise.all([
      this.getOverallStats(),
      this.getPostsOverTime(days),
      this.getViewsPerPost(),
      this.getDraftVsPublished(),
    ]);

    return {
      ...overall,
      postsOverTime,
      viewsPerPost,
      draftVsPublished,
    };
  }
}

export default new StatsService();

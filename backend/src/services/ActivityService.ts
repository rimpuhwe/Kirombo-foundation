import prisma from "../lib/db.js";
import { ActivityType } from "@prisma/client";

export class ActivityService {
  async logActivity(data: {
    type: ActivityType;
    message: string;
    postId?: string;
  }) {
    const activity = await prisma.activity.create({
      data: {
        type: data.type,
        message: data.message,
        postId: data.postId,
      },
    });

    return activity;
  }

  async getActivities(limit: number = 20) {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { post: { select: { id: true, title: true } } },
    });

    return activities;
  }

  async getActivitiesByPost(postId: string) {
    const activities = await prisma.activity.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });

    return activities;
  }

  async clearActivities() {
    await prisma.activity.deleteMany();
  }
}

export default new ActivityService();

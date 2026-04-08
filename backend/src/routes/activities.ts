import { Router, Request, Response } from "express";
import ActivityService from "../services/ActivityService.js";

const router = Router();

// Get recent activities
router.get("/", async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const activities = await ActivityService.getActivities(limit ? parseInt(limit as string) : 20);
    res.json(activities);
  } catch (error) {
    console.error("[GET /activities] Error:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// Get activities by post
router.get("/post/:postId", async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const activities = await ActivityService.getActivitiesByPost(postId);
    res.json(activities);
  } catch (error) {
    console.error("[GET /activities/post/:postId] Error:", error);
    res.status(500).json({ error: "Failed to fetch post activities" });
  }
});

export default router;

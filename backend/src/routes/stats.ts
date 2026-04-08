import { Router, Request, Response } from "express";
import StatsService from "../services/StatsService.js";
import { getWebSocketService } from "../services/WebSocketService.js";

const router = Router();

// Get overall stats
router.get("/", async (req: Request, res: Response) => {
  try {
    const stats = await StatsService.getComprehensiveStats(30);
    res.json(stats);
  } catch (error) {
    console.error("[GET /stats] Error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Get posts over time
router.get("/posts-over-time", async (req: Request, res: Response) => {
  try {
    const { days } = req.query;
    const postsOverTime = await StatsService.getPostsOverTime(days ? parseInt(days as string) : 30);
    res.json(postsOverTime);
  } catch (error) {
    console.error("[GET /stats/posts-over-time] Error:", error);
    res.status(500).json({ error: "Failed to fetch posts over time" });
  }
});

// Get views per post
router.get("/views-per-post", async (req: Request, res: Response) => {
  try {
    const viewsPerPost = await StatsService.getViewsPerPost();
    res.json(viewsPerPost);
  } catch (error) {
    console.error("[GET /stats/views-per-post] Error:", error);
    res.status(500).json({ error: "Failed to fetch views per post" });
  }
});

// Get draft vs published
router.get("/draft-vs-published", async (req: Request, res: Response) => {
  try {
    const draftVsPublished = await StatsService.getDraftVsPublished();
    res.json(draftVsPublished);
  } catch (error) {
    console.error("[GET /stats/draft-vs-published] Error:", error);
    res.status(500).json({ error: "Failed to fetch draft vs published stats" });
  }
});

export default router;

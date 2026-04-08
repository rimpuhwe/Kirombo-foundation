import { Router, Request, Response } from "express";
import PostService from "../services/PostService.js";
import ActivityService from "../services/ActivityService.js";
import { validatePost } from "../lib/validation.js";
import { getWebSocketService } from "../services/WebSocketService.js";

const router = Router();

// Create post
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, content, status } = req.body;

    const validation = validatePost({ title, description, content, status });
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.errors });
    }

    const post = await PostService.createPost({
      title,
      description,
      content,
      status: status || "DRAFT",
    });

    const activity = await ActivityService.logActivity({
      type: status === "PUBLISHED" ? "PUBLISH" : "CREATE",
      message: `${status === "PUBLISHED" ? "Published" : "Created"} post: "${post.title}"`,
      postId: post.id,
    });

    // Broadcast to WebSocket clients
    const ws = getWebSocketService();
    ws.broadcastActivity(activity);

    res.status(201).json(post);
  } catch (error) {
    console.error("[POST /posts] Error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get all posts
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate } = req.query;

    const posts = await PostService.getAllPosts({
      status: (status as "DRAFT" | "PUBLISHED") || undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

    res.json(posts);
  } catch (error) {
    console.error("[GET /posts] Error:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get single post
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await PostService.getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("[GET /posts/:id] Error:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Update post
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, content, status } = req.body;

    // Validate
    const validation = validatePost({ title, description, content, status });
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.errors });
    }

    const post = await PostService.updatePost(id, {
      title,
      description,
      content,
      status,
    });

    const activity = await ActivityService.logActivity({
      type: "UPDATE",
      message: `Updated post: "${post.title}"`,
      postId: post.id,
    });

    const ws = getWebSocketService();
    ws.broadcastActivity(activity);
    ws.broadcastPostUpdated(post);

    res.json(post);
  } catch (error) {
    console.error("[PUT /posts/:id] Error:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Delete post
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await PostService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await PostService.deletePost(id);

    const activity = await ActivityService.logActivity({
      type: "DELETE",
      message: `Deleted post: "${post.title}"`,
      postId: post.id,
    });

    const ws = getWebSocketService();
    ws.broadcastActivity(activity);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("[DELETE /posts/:id] Error:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Increment views
router.post("/:id/view", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await PostService.incrementViews(id);

    const activity = await ActivityService.logActivity({
      type: "VIEW",
      message: `Post viewed: "${post.title}" (Total: ${post.views})`,
      postId: post.id,
    });

    const ws = getWebSocketService();
    ws.broadcastActivity(activity);
    ws.broadcastPostUpdated(post);

    res.json(post);
  } catch (error) {
    console.error("[POST /posts/:id/view] Error:", error);
    res.status(500).json({ error: "Failed to increment views" });
  }
});

// Increment likes
router.post("/:id/like", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await PostService.incrementLikes(id);

    const activity = await ActivityService.logActivity({
      type: "LIKE",
      message: `Post liked: "${post.title}" (Total: ${post.likes})`,
      postId: post.id,
    });

    const ws = getWebSocketService();
    ws.broadcastActivity(activity);
    ws.broadcastPostUpdated(post);

    res.json(post);
  } catch (error) {
    console.error("[POST /posts/:id/like] Error:", error);
    res.status(500).json({ error: "Failed to increment likes" });
  }
});

export default router;

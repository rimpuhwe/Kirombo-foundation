import { Router } from 'express';
import { query } from '../services/database.js';

const router = Router();

// Get overall stats
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        COUNT(DISTINCT p.id) as total_posts,
        COUNT(CASE WHEN p.status = 'published' THEN 1 END) as published_posts,
        COUNT(CASE WHEN p.status = 'draft' THEN 1 END) as draft_posts,
        COALESCE(SUM(COALESCE(s.views, 0)), 0) as total_views,
        COALESCE(SUM(COALESCE(s.likes, 0)), 0) as total_likes,
        COALESCE(SUM(COALESCE(s.comments, 0)), 0) as total_comments
      FROM posts p
      LEFT JOIN post_stats s ON p.id = s.post_id;
    `);

    const stats = result.rows[0];
    res.json({
      blogClicks: parseInt(stats.total_views),
      monthlyOpens: parseInt(stats.total_posts),
      likes: parseInt(stats.total_likes),
      comments: parseInt(stats.total_comments),
      publishedPosts: parseInt(stats.published_posts),
      draftPosts: parseInt(stats.draft_posts),
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get daily stats for charts
router.get('/daily', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as posts_created,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as posts_published
      FROM posts
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC;
    `);

    const data = result.rows.map((row) => ({
      date: row.date,
      created: parseInt(row.posts_created),
      published: parseInt(row.posts_published),
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    res.status(500).json({ error: 'Failed to fetch daily stats' });
  }
});

// Get post stats
router.get('/posts', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        p.id,
        p.title,
        COALESCE(s.views, 0) as views,
        COALESCE(s.likes, 0) as likes,
        COALESCE(s.comments, 0) as comments
      FROM posts p
      LEFT JOIN post_stats s ON p.id = s.post_id
      ORDER BY COALESCE(s.views, 0) DESC;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching post stats:', error);
    res.status(500).json({ error: 'Failed to fetch post stats' });
  }
});

// Update post stats (incrementing views)
router.post('/:postId/view', async (req, res) => {
  const { postId } = req.params;

  try {
    await query(
      `
      UPDATE post_stats
      SET views = views + 1, updated_at = CURRENT_TIMESTAMP
      WHERE post_id = $1;
      `,
      [postId]
    );

    res.json({ message: 'View recorded' });
  } catch (error) {
    console.error('Error recording view:', error);
    res.status(500).json({ error: 'Failed to record view' });
  }
});

// Like post
router.post('/:postId/like', async (req, res) => {
  const { postId } = req.params;

  try {
    await query(
      `
      UPDATE post_stats
      SET likes = likes + 1, updated_at = CURRENT_TIMESTAMP
      WHERE post_id = $1;
      `,
      [postId]
    );

    res.json({ message: 'Like recorded' });
  } catch (error) {
    console.error('Error recording like:', error);
    res.status(500).json({ error: 'Failed to record like' });
  }
});

// Add comment
router.post('/:postId/comment', async (req, res) => {
  const { postId } = req.params;

  try {
    await query(
      `
      UPDATE post_stats
      SET comments = comments + 1, updated_at = CURRENT_TIMESTAMP
      WHERE post_id = $1;
      `,
      [postId]
    );

    res.json({ message: 'Comment recorded' });
  } catch (error) {
    console.error('Error recording comment:', error);
    res.status(500).json({ error: 'Failed to record comment' });
  }
});

export default router;

import { Router } from 'express';
import { query } from '../services/database.js';
import {
  broadcastStats,
  broadcastActivity,
  broadcastPostUpdate,
} from '../services/websocket.js';

const router = Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        p.id,
        p.title,
        p.description,
        p.content,
        p.status,
        p.created_at as "createdAt",
        p.updated_at as "updatedAt",
        COALESCE(s.views, 0) as views,
        COALESCE(s.likes, 0) as likes,
        COALESCE(s.comments, 0) as comments
      FROM posts p
      LEFT JOIN post_stats s ON p.id = s.post_id
      ORDER BY p.created_at DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      `
      SELECT 
        p.id,
        p.title,
        p.description,
        p.content,
        p.status,
        p.created_at as "createdAt",
        p.updated_at as "updatedAt",
        COALESCE(s.views, 0) as views,
        COALESCE(s.likes, 0) as likes,
        COALESCE(s.comments, 0) as comments
      FROM posts p
      LEFT JOIN post_stats s ON p.id = s.post_id
      WHERE p.id = $1;
      `,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create post
router.post('/', async (req, res) => {
  const { title, description, content, status = 'draft' } = req.body;

  if (!title || !description || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await query(
      `
      INSERT INTO posts (title, description, content, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, description, content, status, created_at as "createdAt", updated_at as "updatedAt";
      `,
      [title, description, content, status]
    );

    const post = result.rows[0];

    // Create stats entry
    await query(
      `
      INSERT INTO post_stats (post_id, views, likes, comments)
      VALUES ($1, 0, 0, 0);
      `,
      [post.id]
    );

    // Log activity
    await query(
      `
      INSERT INTO activity_log (type, post_id, message)
      VALUES ($1, $2, $3);
      `,
      [
        status === 'published' ? 'post_published' : 'post_created',
        post.id,
        `Post "${title}" was ${status === 'published' ? 'published' : 'created'}`,
      ]
    );

    broadcastActivity({
      type: status === 'published' ? 'post_published' : 'post_created',
      postId: post.id,
      message: post.title,
      createdAt: new Date().toISOString(),
    });

    broadcastStats();
    broadcastPostUpdate(post);

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  const { title, description, content, status } = req.body;
  const { id } = req.params;

  if (!title || !description || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await query(
      `
      UPDATE posts
      SET title = $1, description = $2, content = $3, status = COALESCE($4, status), updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, title, description, content, status, created_at as "createdAt", updated_at as "updatedAt";
      `,
      [title, description, content, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = result.rows[0];
    broadcastActivity({
      type: 'post_updated',
      postId: post.id,
      message: `Post "${title}" was updated`,
      createdAt: new Date().toISOString(),
    });

    broadcastPostUpdate(post);
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const postResult = await query(`SELECT title FROM posts WHERE id = $1`, [
      id,
    ]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await query(`DELETE FROM posts WHERE id = $1`, [id]);

    broadcastActivity({
      type: 'post_deleted',
      postId: parseInt(id),
      message: `Post "${postResult.rows[0].title}" was deleted`,
      createdAt: new Date().toISOString(),
    });

    broadcastStats();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Get activity log
router.get('/activity/log', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id,
        type,
        post_id as "postId",
        message,
        created_at as "createdAt"
      FROM activity_log
      ORDER BY created_at DESC
      LIMIT 20;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching activity log:', error);
    res.status(500).json({ error: 'Failed to fetch activity log' });
  }
});

export default router;

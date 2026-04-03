import { Server } from 'socket.io';
import { query } from './database.js';

let io = null;

export const initializeWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('subscribe', (topic) => {
      socket.join(topic);
      console.log(`Client subscribed to ${topic}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('WebSocket not initialized. Call initializeWebSocket first.');
  }
  return io;
};

export const broadcastStats = async () => {
  try {
    const result = await query(`
      SELECT 
        COUNT(DISTINCT id) as total_posts,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_posts,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_posts,
        COALESCE(SUM(COALESCE(stats.views, 0)), 0) as total_views,
        COALESCE(SUM(COALESCE(stats.likes, 0)), 0) as total_likes,
        COALESCE(SUM(COALESCE(stats.comments, 0)), 0) as total_comments
      FROM posts
      LEFT JOIN post_stats stats ON posts.id = stats.post_id;
    `);

    const stats = result.rows[0];
    io.to('blog-stats').emit('stats-update', {
      type: 'blog-stats',
      payload: {
        blogClicks: parseInt(stats.total_views),
        monthlyOpens: parseInt(stats.total_posts),
        likes: parseInt(stats.total_likes),
        comments: parseInt(stats.total_comments),
      },
    });
  } catch (error) {
    console.error('Error broadcasting stats:', error);
  }
};

export const broadcastActivity = (activity) => {
  if (io) {
    io.to('activities').emit('activity', activity);
  }
};

export const broadcastPostUpdate = (post) => {
  if (io) {
    io.to('posts-update').emit('post-updated', post);
  }
};

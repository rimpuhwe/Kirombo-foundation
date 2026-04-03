# Blog Dashboard Backend Setup

This guide explains how to set up and run the backend server for the Kirombo Foundation Blog Dashboard.

## Prerequisites

- Node.js 16+ and npm
- PostgreSQL 12+ (or compatible PostgreSQL service)

## Installation

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and configure your database connection:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
PORT=8080
NODE_ENV=development

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=kirombo_blog

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 3. Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE kirombo_blog;

# Exit psql
\q
```

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

The server will:
- Initialize database tables automatically
- Start listening on `http://localhost:8080`
- WebSocket endpoint available at `ws://localhost:8080`

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/activity/log` - Get activity log

### Stats
- `GET /api/stats` - Get overall stats
- `GET /api/stats/daily` - Get daily stats (last 30 days)
- `GET /api/stats/posts` - Get stats per post
- `POST /api/stats/:postId/view` - Record view
- `POST /api/stats/:postId/like` - Record like
- `POST /api/stats/:postId/comment` - Record comment

## Frontend Configuration

The frontend is already configured to connect to the backend via:

**`.env.local` file (in project root):**
```env
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=http://localhost:8080
```

These variables are used by the frontend services to make API calls.

## Running Both Frontend and Backend

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser and navigate to `/admin` to access the dashboard.

## Database Schema

The backend automatically creates three tables:

### posts
- `id` (PRIMARY KEY)
- `title` (VARCHAR)
- `description` (TEXT)
- `content` (TEXT)
- `status` ('draft' or 'published')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### post_stats
- `id` (PRIMARY KEY)
- `post_id` (FOREIGN KEY)
- `views` (INTEGER)
- `likes` (INTEGER)
- `comments` (INTEGER)
- `updated_at` (TIMESTAMP)

### activity_log
- `id` (PRIMARY KEY)
- `type` (VARCHAR)
- `post_id` (FOREIGN KEY, NULLABLE)
- `message` (TEXT)
- `created_at` (TIMESTAMP)

## WebSocket Events

### Client → Server
- `subscribe` - Subscribe to a topic (e.g., 'blog-stats', 'activities', 'posts-update')

### Server → Client
- `stats-update` - Broadcast when stats change
- `activity` - Broadcast when new activity occurs
- `post-updated` - Broadcast when a post is updated

## Troubleshooting

### Port already in use
```bash
# Find process using port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Database connection error
- Check PostgreSQL is running
- Verify credentials in `.env`
- Ensure database exists: `CREATE DATABASE kirombo_blog;`

### CORS errors
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Default is `http://localhost:5173`

## Production Deployment

For production deployment:

1. Use a production PostgreSQL database
2. Set `NODE_ENV=production`
3. Use environment variables for sensitive data
4. Configure proper CORS origins
5. Use HTTPS for WebSocket connections (`wss://`)
6. Deploy to a Node.js hosting platform (Vercel, Render, Heroku, etc.)

## Development Tips

- Backend server auto-restarts on file changes (using `--watch` flag)
- WebSocket connections persist across page refreshes
- Activity log and stats update in real-time
- Check browser console for API errors

## Support

For issues or questions about the backend setup, refer to the comments in:
- `backend/src/server.js` - Main server configuration
- `backend/src/routes/posts.js` - Post API routes
- `backend/src/routes/stats.js` - Stats API routes

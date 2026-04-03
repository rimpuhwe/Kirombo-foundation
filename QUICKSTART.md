# Blog Dashboard - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites
- Node.js 16+
- PostgreSQL 12+

## Step 1: Setup Database (1 min)

```bash
# Create PostgreSQL database
createdb kirombo_blog
```

## Step 2: Start Backend (1 min)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: Update DB_PASSWORD if needed
npm run dev
```

✅ Backend running on `http://localhost:8080`

## Step 3: Start Frontend (1 min)

In a new terminal:

```bash
npm install
npm run dev
```

✅ Frontend running on `http://localhost:5173`

## Step 4: Access Dashboard (1 min)

1. Open browser: `http://localhost:5173/admin`
2. You should see the admin dashboard with 4 tabs:
   - **Dashboard** - Analytics & charts
   - **Blog** - Create new posts
   - **Posts** - Manage all posts
   - **Settings** - Configuration

## Step 5: Test It Out (1 min)

### Create a Post
1. Click "Blog" tab
2. Fill in title, description, and content
3. Click "Post" to publish or "Save to Draft"
4. Watch the analytics update in real-time!

### View Analytics
1. Click "Dashboard" tab
2. See live stats: Views, Posts, Likes, Comments
3. View charts showing trends
4. Watch activity feed for recent actions

### Manage Posts
1. Click "Posts" tab
2. Search, filter, edit, or delete posts
3. See post status badges (Published/Draft)
4. Try the real-time sync: Open in multiple tabs

## Common Commands

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
npm run dev

# Create database (one-time)
createdb kirombo_blog

# Reset database (if needed)
dropdb kirombo_blog
createdb kirombo_blog
```

## Environment Files

### `.env.local` (Frontend)
```
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=http://localhost:8080
```

### `backend/.env` (Backend)
```
PORT=8080
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=kirombo_blog
CORS_ORIGIN=http://localhost:5173
```

## What You Get

✅ Real-time blog editor with rich HTML support
✅ Live analytics dashboard with charts
✅ Post management (create, edit, delete)
✅ Activity tracking and logging
✅ WebSocket-powered instant updates
✅ Dark mode support
✅ Responsive design (mobile, tablet, desktop)

## Next Steps

1. **Deploy Backend**: Use Vercel, Render, or Heroku
2. **Deploy Frontend**: Use Vercel or Netlify
3. **Add Authentication**: Implement user login
4. **Custom Domain**: Set up your own domain
5. **Email Notifications**: Add post update alerts

## API Endpoints

```
GET  /api/posts              # All posts
GET  /api/posts/:id          # Single post
POST /api/posts              # Create post
PUT  /api/posts/:id          # Update post
DELETE /api/posts/:id        # Delete post

GET  /api/stats              # Dashboard stats
GET  /api/stats/daily        # Daily metrics
POST /api/stats/:id/view     # Track view
POST /api/stats/:id/like     # Track like
```

## WebSocket Topics

Subscribe to real-time updates:
- `blog-stats` - Dashboard statistics
- `activities` - Activity feed events
- `posts-update` - Post changes

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to database" | Run `createdb kirombo_blog` |
| "Port 8080 already in use" | Kill process: `lsof -i :8080` \|  `kill -9 <PID>` |
| "Cannot GET /api/posts" | Check backend is running on 8080 |
| "WebSocket connection refused" | Verify VITE_WS_URL in .env.local |
| "CORS error" | Check CORS_ORIGIN in backend .env |

## Documentation

- 📖 See `IMPLEMENTATION_SUMMARY.md` for full details
- 🔧 See `BACKEND_SETUP.md` for backend configuration
- 💻 Check individual component comments for code details

## Success Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `kirombo_blog` created
- [ ] Backend dependencies installed
- [ ] Backend running on port 8080
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 5173
- [ ] Can access `/admin` route
- [ ] Created a test post
- [ ] See stats update on dashboard
- [ ] Edit/delete post works

🎉 **You're all set! Enjoy your blog dashboard!**

---

Need help? Check the error messages in your terminal or browser console for detailed information.

# Backend & Frontend Integration Guide

## Overview
This guide explains how to connect the frontend and backend, and all the loading states that have been implemented throughout the application.

## Architecture

```
Frontend (Vite + React)  <---> Backend (Express + TypeScript)
:5173                          :3000
```

### Frontend Structure
- `/src/services/api.ts` - API client with type safety
- `/src/hooks/useData.ts` - React hooks for data fetching with loading states
- Components use hooks for real-time data updates

### Backend Structure
- `/backend/src/index.ts` - Express server with WebSocket support
- `/backend/src/routes/` - API endpoints
- `/backend/src/services/` - Business logic
- `/backend/prisma/schema.prisma` - Database schema

## Environment Setup

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3000/api
```

The frontend automatically reads this to know where the backend is located.

### Backend (backend/.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/blog_dashboard"
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Loading States Implementation

### What's Connected?

#### DashboardHome Component
- **Stats Section**: Shows total posts, published, drafts, views, likes, comments
  - Uses `useStats()` hook
  - Shows skeleton loaders while loading
  - Displays real-time calculated averages

- **Performance Section**: Blog performance metrics
  - Displays stats with loading skeletons
  - Shows average views per post (calculated from total views/total posts)

- **Recent Activity Section**: Activity feed
  - Uses `useActivities()` hook
  - Shows 3 skeleton items while loading
  - Displays "No recent activity" when empty
  - Color-coded activity types (green for publish, blue for draft, orange for other)

#### BlogManager Component
- **Create Post Form**:
  - Form has title, description (max 200 chars), and content editor
  - Uses `useCreatePost()` hook with loading state
  - Publish button shows "Publishing..." state while loading
  - Save Draft button also uses backend (no longer localStorage)
  - Automatically clears form after success

#### PostsManager Component
- **Post List with Filters**:
  - Uses `usePosts()` hook with loading state
  - Search functionality (filters by title and description)
  - Status filter (All, Published, Draft)
  - Date range filtering
  - Shows 3 skeleton loaders while loading
  - Each post card shows:
    - Delete button with confirmation
    - Edit button (for future implementation)
    - Read button to view full post
    - Status badge (Published = green, Draft = yellow)

## API Endpoints

### Posts
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/view` - Record a view
- `POST /api/posts/:id/like` - Like a post

### Stats
- `GET /api/stats` - Get overall statistics
- `GET /api/stats/posts-over-time?days=30` - Posts created in last N days
- `GET /api/stats/top-posts?limit=10` - Top posts by views

### Activities
- `GET /api/activities?limit=20` - Recent activity feed
- `GET /api/activities/post/:postId` - Activity for specific post

## Running the Application

### 1. Start the Database (using Docker)
```bash
cd /vercel/share/v0-project
docker-compose up -d postgres
```

### 2. Run Backend Migrations
```bash
cd backend
npx prisma migrate dev --name init
# This will:
# - Create database tables
# - Seed sample data (if configured)
```

### 3. Start the Backend Server
```bash
cd backend
npm install
npm run dev
# Server starts on http://localhost:3000
```

### 4. Start the Frontend
```bash
# In a new terminal, from project root
npm install
npm run dev
# Frontend starts on http://localhost:5173
```

### 5. Access the Application
```
Open http://localhost:5173/admin in your browser
```

## Data Flow Example: Creating a Post

```
User fills form in BlogManager
         ↓
Clicks "Publish Post" button
         ↓
useCreatePost() hook calls apiClient.createPost()
         ↓
Loading state shows "Publishing..."
         ↓
POST /api/posts with form data
         ↓
Backend validates and saves to database
         ↓
Response returned to frontend
         ↓
Form clears, success message shown
         ↓
useRefetch() automatically updates the posts list
```

## Loading State Types

### 1. Skeleton Loaders
Used for stat cards and performance metrics while data loads:
```tsx
{loading ? <Skeleton className="w-16 h-8 mt-1" /> : <p>{value}</p>}
```

### 2. Button States
Used for form submission buttons:
```tsx
<button disabled={submitting}>
  {submitting ? "Publishing..." : "Publish Post"}
</button>
```

### 3. List Loaders
Used for post lists while fetching:
```tsx
{loading ? (
  <div>{[1,2,3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>
) : <PostList />}
```

### 4. Empty States
Used when no data is available:
```tsx
{filtered.length === 0 ? (
  <div>No posts found</div>
) : <PostList />}
```

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill the process if needed
kill -9 <PID>
```

### Database Connection Error
```bash
# Verify PostgreSQL is running
docker ps | grep postgres

# Check DATABASE_URL in backend/.env
# Format: postgresql://user:password@localhost:5432/blog_dashboard
```

### Frontend Can't Connect to Backend
```bash
# Make sure VITE_API_URL is set correctly in .env.local
VITE_API_URL=http://localhost:3000/api

# Verify backend is running on port 3000
curl http://localhost:3000/health
# Should return JSON with status: "ok"
```

### CORS Errors
```bash
# Make sure FRONTEND_URL matches your frontend URL in backend/.env
FRONTEND_URL=http://localhost:5173
```

## Key Features

✅ **Real-time Data Fetching** - Automatic refetching after mutations
✅ **Loading States** - Skeleton loaders and button states everywhere
✅ **Error Handling** - User-friendly error messages
✅ **Type Safety** - Full TypeScript support
✅ **Search & Filter** - Posts list has search and multiple filters
✅ **CRUD Operations** - Create, read, update, delete posts
✅ **Activity Tracking** - All actions logged and displayed in feed
✅ **Statistics** - Real-time dashboard stats with calculations

## Next Steps

1. **Add Edit Post Functionality**
   - Implement updatePost hook
   - Create edit form similar to create

2. **Add WebSocket Updates**
   - Real-time post updates
   - Live activity feed

3. **Add User Comments**
   - New API endpoints for comments
   - Comment form on post detail page

4. **Add Authentication**
   - User login/register
   - JWT token management
   - Permission checks

5. **Add Image Upload**
   - File upload endpoint
   - Image optimization
   - CDN integration

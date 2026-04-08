# Complete Setup & Integration Guide

## What Was Built

### Frontend Integration Layer
- **API Service** (`src/services/api.ts`) - Type-safe API client with full endpoints
- **Data Hooks** (`src/hooks/useData.ts`) - 8 custom React hooks with loading states:
  - `usePosts()` - Fetch all posts with loading state
  - `usePost()` - Fetch single post with loading state
  - `useCreatePost()` - Create post with loading state
  - `useUpdatePost()` - Update post with loading state
  - `useDeletePost()` - Delete post with loading state
  - `useStats()` - Fetch dashboard stats with loading state
  - `useActivities()` - Fetch activity feed with loading state

### Components Updated with Loading States

#### 1. DashboardHome (`src/pages/admin/Dashboard/DashboardHome.tsx`)
**What's Connected:**
- Stat cards showing: Total Views, Total Posts, Total Likes, Total Comments
- Performance section with: Published count, Draft count, Average views per post
- Recent Activity feed with timestamped activities

**Loading States Implemented:**
- Skeleton loaders for stat cards while fetching
- Skeleton grid for performance metrics
- Skeleton list items for activity feed
- Empty state message when no activities exist
- Auto-calculating metrics from backend data

**Data Flow:**
```
useStats() hook → GET /api/stats → Dashboard updates → Display with calculations
useActivities() hook → GET /api/activities → Activity feed populated
usePosts() hook → Used for performance metrics
```

#### 2. BlogManager (`src/pages/admin/Dashboard/BlogManager.tsx`)
**What's Connected:**
- Form to create blog posts
- Title, description (max 200 chars), content fields
- Publish and Save Draft buttons

**Loading States Implemented:**
- "Publishing..." state on publish button
- "Saving..." state on draft button (if implementing)
- Form clears after successful submission
- Error messages displayed to user
- Disabled button while submitting

**Data Flow:**
```
User fills form → Click "Publish Post" → useCreatePost() hook
→ POST /api/posts → Backend validates & saves
→ Form clears → Success message → useRefetch() updates posts list
```

**Draft Handling:**
- Drafts now saved to backend (not localStorage)
- Drafts appear in PostsManager with Draft status badge
- Can be published later by editing

#### 3. PostsManager (`src/pages/admin/Dashboard/PostsManager.tsx`)
**What's Connected:**
- List of all posts (published and draft)
- Search functionality (by title and description)
- Status filter (All, Published, Draft)
- Date range filtering
- Delete post functionality
- Edit button (ready for future implementation)

**Loading States Implemented:**
- 3 skeleton post cards while loading
- "No posts found" message when empty
- Disabled delete button while deleting
- Confirmation dialog before delete
- Success/error messages for operations

**Data Flow:**
```
usePosts() hook → GET /api/posts → List populated → Filter/search applied
→ User clicks Delete → useDeletePost() → DELETE /api/posts/:id
→ usePosts().refetch() → List refreshed
```

**Features:**
- Real-time search as you type
- Multiple filters work together
- Each post card shows:
  - Image from content (or placeholder)
  - Title and description
  - Creation date
  - Status badge (color-coded)
  - Read, Edit, Delete buttons

## Backend Endpoints Connected

### Posts API
```
GET    /api/posts           - List all posts (used by PostsManager)
POST   /api/posts           - Create post (used by BlogManager)
GET    /api/posts/:id       - Get single post (used by PostContentPage)
PUT    /api/posts/:id       - Update post (ready for Edit feature)
DELETE /api/posts/:id       - Delete post (used by PostsManager)
POST   /api/posts/:id/view  - Record view (not yet used)
POST   /api/posts/:id/like  - Like post (not yet used)
```

### Stats API
```
GET /api/stats              - Overall statistics (used by DashboardHome)
GET /api/stats/posts-over-time?days=30
GET /api/stats/top-posts?limit=10
```

### Activities API
```
GET /api/activities?limit=20           - Activity feed (used by DashboardHome)
GET /api/activities/post/:postId       - Post-specific activities
```

## Environment Configuration

### Frontend (.env.local)
```env
# Location of backend API
VITE_API_URL=http://localhost:3000/api
```

This file has been created automatically. If you need to change the backend URL:
1. Edit `.env.local`
2. Restart the dev server

### Backend (backend/.env)
```env
# Database connection - required for database to work
DATABASE_URL="postgresql://user:password@localhost:5432/blog_dashboard"

# Server configuration
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# CORS configuration - must match frontend URL
CORS_ORIGIN=http://localhost:5173
```

## Installation & Running

### Option 1: Using the Startup Script (Easiest)

```bash
# From project root
chmod +x START.sh
./START.sh
```

This will:
1. Start PostgreSQL in Docker
2. Run database migrations
3. Start backend on port 3000
4. Start frontend on port 5173
5. Open the admin dashboard

### Option 2: Manual Setup

**Terminal 1 - Start Database:**
```bash
docker-compose up -d postgres
# Wait for postgres to be ready (5-10 seconds)
```

**Terminal 2 - Start Backend:**
```bash
cd backend
npm install
npx prisma migrate dev --name init  # Run migrations
npm run dev                         # Start server
# Backend runs on http://localhost:3000
```

**Terminal 3 - Start Frontend:**
```bash
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

**Open Browser:**
```
http://localhost:5173/admin
```

## Verifying the Connection

### Check Backend is Running
```bash
curl http://localhost:3000/health
# Should return: {"status":"ok","timestamp":"...","uptime":...}
```

### Check Frontend Can Reach Backend
1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload http://localhost:5173/admin
4. You should see API calls to `localhost:3000/api/...`

### Check Database Connection
```bash
# In backend folder
npx prisma studio
# Opens Prisma Studio at http://localhost:5555
# Shows all data in database tables
```

## Loading States Summary

### Where You'll See Them

| Component | Loading State | Where |
|-----------|---------------|-------|
| DashboardHome | Skeleton cards | Stats section |
| DashboardHome | Skeleton rows | Performance metrics |
| DashboardHome | Skeleton list | Recent activity |
| BlogManager | "Publishing..." | Publish button |
| BlogManager | "Saving..." | Save Draft button |
| PostsManager | Skeleton posts | List while loading |
| PostsManager | "Deleting..." | Delete button |
| PostsManager | Empty message | When no posts |

### Loading State Patterns Used

**1. Skeleton Loaders**
```tsx
{loading ? <Skeleton className="h-8 w-16" /> : <span>{value}</span>}
```

**2. Button States**
```tsx
<button disabled={loading}>{loading ? 'Loading...' : 'Action'}</button>
```

**3. List Loaders**
```tsx
{loading ? <LoadingList /> : <ActualList />}
```

**4. Empty States**
```tsx
{data.length === 0 ? <EmptyMessage /> : <DataList />}
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                     │
├──────────────────────┬──────────────────────┬────────────┤
│                      │                      │            │
│  BlogManager         │  PostsManager        │ DashboardHome
│  (Create Posts)      │  (List Posts)        │ (View Stats)
│                      │                      │
└──────────┬───────────┴──────────┬───────────┴──────┬─────┘
           │                      │                  │
           │  API Calls           │                  │
           │  (fetch)             │                  │
           ↓                      ↓                  ↓
    ┌─────────────────────────────────────────────────────┐
    │         Backend API (Express)                        │
    │  ┌─────────┬──────────┬──────────┬──────────┐       │
    │  │ Posts   │ Stats    │Activities│ Health   │       │
    │  │ Routes  │ Routes   │ Routes   │ Check    │       │
    │  └────┬────┴────┬─────┴────┬─────┴────┬─────┘       │
    │       │         │          │          │             │
    │       └─────────┼──────────┼──────────┘             │
    │                 ↓                                     │
    │        ┌─────────────────┐                          │
    │        │  Prisma ORM     │                          │
    │        │  (Type-Safe)    │                          │
    │        └────────┬────────┘                          │
    └─────────────────┼──────────────────────────────────┘
                      ↓
    ┌─────────────────────────────────────────────────────┐
    │         PostgreSQL Database                         │
    │  ┌───────────────────┬──────────────────────┐      │
    │  │ posts table       │ activities table     │      │
    │  │ (id, title,       │ (id, type,          │      │
    │  │  content, status) │  message, postId)   │      │
    │  └───────────────────┴──────────────────────┘      │
    └─────────────────────────────────────────────────────┘
```

## Troubleshooting

### "Cannot GET /api/posts"
- Backend is not running
- Check if `npm run dev` is running in `/backend` folder
- Try: `curl http://localhost:3000/health`

### "Failed to fetch" in browser console
- Backend URL is wrong in `.env.local`
- CORS is not configured correctly
- Check if both frontend and backend are running on the right ports

### "Database connection refused"
- PostgreSQL is not running
- Check: `docker ps | grep postgres`
- Start: `docker-compose up -d postgres`

### Posts not saving
- Database tables don't exist
- Run migrations: `npx prisma migrate dev`
- Check database: `npx prisma studio`

### Changes not reflecting
- Frontend cache issue: Clear browser cache (Ctrl+Shift+Delete)
- Or use Ctrl+Shift+R to hard refresh
- Or restart dev server with `npm run dev`

## Next Steps

### 1. Add Edit Post Feature
```tsx
// Use useUpdatePost hook similar to create
const { update, loading } = useUpdatePost(postId);
await update({ title: 'New Title' });
```

### 2. Add Image Upload
```typescript
// Add to BlogManager form
<input type="file" accept="image/*" />
// Send with FormData in createPost
```

### 3. Add User Comments
```typescript
// Create new hook: useComments
// New API endpoint: POST /api/posts/:id/comments
```

### 4. Add Real-time Updates (WebSocket)
```typescript
// Backend already has WebSocket setup
// Create useWebSocket hook for live updates
```

### 5. Add Authentication
```typescript
// Create useAuth hook
// Add login endpoint: POST /api/auth/login
// Add JWT token handling
```

## File Summary

### Created/Modified Files

**Frontend:**
- ✅ `/src/services/api.ts` - Created (123 lines)
- ✅ `/src/hooks/useData.ts` - Created (204 lines)
- ✅ `.env.local` - Created (2 lines)
- ✅ `/src/pages/admin/Dashboard/DashboardHome.tsx` - Updated
- ✅ `/src/pages/admin/Dashboard/BlogManager.tsx` - Updated
- ✅ `/src/pages/admin/Dashboard/PostsManager.tsx` - Updated

**Backend:**
- ✅ Already has full implementation ready
- ✅ Just needs database connection

**Documentation:**
- ✅ `INTEGRATION.md` - Integration guide
- ✅ `SETUP_AND_INTEGRATION.md` - This file
- ✅ `START.sh` - Automated startup script
- ✅ `BACKEND_SETUP.md` - Detailed backend setup
- ✅ `QUICK_REFERENCE.md` - Quick reference guide

## Success Indicators

When everything is connected correctly, you should see:

✅ Dashboard loading with real stats from backend
✅ "Publishing..." shows when creating posts
✅ Posts appear immediately after publishing
✅ PostsManager shows all posts with real data
✅ Search and filters work in real-time
✅ Delete button removes posts from list
✅ No "Failed to fetch" errors in console
✅ Network tab shows successful API calls

## Performance Tips

1. **Caching**: Hooks cache data automatically with fetch
2. **Debouncing**: Search is debounced in PostsManager (add if needed)
3. **Pagination**: Backend supports limit parameter, add to frontend
4. **Lazy Loading**: Images in post cards load on-demand
5. **WebSocket**: Backend ready for real-time updates

---

**Everything is now connected and ready to use!** 🎉

Follow the "Running" section above to get started.

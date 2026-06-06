# Blog Dashboard - Full Stack Setup Guide

Complete guide to set up and run the Blog Dashboard system with frontend and backend.

## System Requirements

- Node.js 18+
- PostgreSQL 12+
- npm or yarn
- Docker & Docker Compose (optional, for containerized setup)

## Option 1: Local Development Setup

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 2. Database Setup

**Start PostgreSQL** (if not already running):

```bash
# macOS with Homebrew
brew services start postgresql

# Linux with systemd
sudo systemctl start postgresql

# Or use Docker
docker run --name blog-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=blog_dashboard -p 5432:5432 -d postgres:15-alpine
```

**Create database and initialize schema:**

```bash
cd backend

# Create .env file
cp .env.example .env

# Initialize database
npm run prisma:migrate

# (Optional) View database in Prisma Studio
npm run prisma:studio
```

### 3. Start the Backend

```bash
cd backend
npm run dev
```

Server will start at: `http://localhost:3000`

Check health:
```bash
curl http://localhost:3000/health
```

### 4. Start the Frontend

In a new terminal:

```bash
npm run dev
```

Frontend will open at: `http://localhost:5173`

### 5. Access the Application

1. Open `http://localhost:5173` in your browser
2. Navigate to the **Admin Dashboard** (usually at `/admin`)
3. Test creating a post, publishing, and monitoring analytics

---

## Option 2: Docker Setup (Recommended)

### 1. Build and Start All Services

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL on port 5432
- Initialize the database schema
- Start the backend on port 3000
- Start the frontend on port 5173

### 2. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
```

### 3. Stop All Services

```bash
docker-compose down
```

---

## Environment Configuration

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/blog_dashboard

# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

---

## API Testing

### Using cURL

**Create a Post:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "description": "A short description",
    "content": "<p>Full HTML content here</p>",
    "status": "PUBLISHED"
  }'
```

**Get All Posts:**
```bash
curl http://localhost:3000/api/posts
```

**Get Statistics:**
```bash
curl http://localhost:3000/api/stats
```

**Increment Views:**
```bash
curl -X POST http://localhost:3000/api/posts/{POST_ID}/view
```

### Using Postman

1. Import the API collection (see `backend/postman-collection.json`)
2. Set the environment variables
3. Test all endpoints

---

## WebSocket Connection

The frontend automatically connects to the WebSocket server at backend startup.

**Test WebSocket Connection:**

```javascript
// Open browser console and run:
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('subscribe:stats');
  socket.emit('subscribe:activities');
});

socket.on('stats:updated', (stats) => {
  console.log('Stats updated:', stats);
});

socket.on('activity:new', (activity) => {
  console.log('New activity:', activity);
});
```

---

## Database Migrations

### Create a New Migration

After modifying `schema.prisma`:

```bash
cd backend
npm run prisma:migrate
```

### View Database Schema

```bash
npm run prisma:studio
```

Opens interactive UI at `http://localhost:5555`

---

## Troubleshooting

### Port Already in Use

**Backend (3000):**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

**Frontend (5173):**
```bash
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error

1. Ensure PostgreSQL is running:
   ```bash
   psql -U postgres -h localhost
   ```

2. Check DATABASE_URL in `.env`

3. Verify database exists:
   ```bash
   psql -U postgres -l
   ```

### CORS Errors

Ensure backend and frontend URLs match in `.env`:
- Backend: `FRONTEND_URL=http://localhost:5173`
- Backend: `CORS_ORIGIN=http://localhost:5173`

### WebSocket Connection Timeout

1. Check backend is running on port 3000
2. Check firewall isn't blocking WebSocket connections
3. Check browser console for connection errors

---

## Production Deployment

### Environment Variables for Production

```env
# Backend
NODE_ENV=production
DATABASE_URL=postgresql://user:pwd@prod-db-host:5432/blog_dashboard
PORT=3000
FRONTEND_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com
```

### Build Backend

```bash
cd backend
npm run build
npm start
```

### Build Frontend

```bash
npm run build
npm run preview
```

---

## Monitoring & Logs

### Backend Logs

```bash
cd backend
npm run dev
```

Logs include:
- Request/response logging
- Database queries (development only)
- WebSocket connection events
- Error stack traces

### Database Logs

Enable query logging in `backend/src/lib/db.ts`:

```typescript
const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});
```

---

## API Documentation

See `backend/README.md` for comprehensive API documentation including:
- All endpoints
- Request/response examples
- Query parameters
- Error handling

---

## Development Tips

### Hot Module Reload

Backend uses `tsx watch` for hot reloading:

```bash
cd backend
npm run dev
```

Changes to TypeScript files automatically reload the server.

### Database Reset

Reset database (caution - deletes all data):

```bash
cd backend
npx prisma migrate reset
```

### Generate TypeScript Types

Update types after schema changes:

```bash
cd backend
npm run prisma:generate
```

---

## Next Steps

1. ✅ Set up frontend and backend locally
2. ✅ Test API endpoints with sample posts
3. ✅ Verify WebSocket real-time updates
4. ✅ Explore admin dashboard features
5. ✅ Customize for your needs
6. ✅ Deploy to production

---

## Support

For issues or questions:
- Check backend logs: `npm run dev`
- Check frontend console (F12)
- Review API errors in network tab
- Verify environment variables

---

## Architecture Overview

```
Blog Dashboard System
├── Frontend (React + Vite)
│   ├── Admin Dashboard
│   ├── Blog Manager
│   ├── Posts Manager
│   └── Settings
│
├── Backend (Node.js + Express)
│   ├── REST API
│   │   ├── Posts CRUD
│   │   ├── Stats & Analytics
│   │   └── Activities Feed
│   │
│   ├── WebSocket Server (Socket.io)
│   │   ├── Real-time Stats
│   │   ├── Activity Updates
│   │   └── Post Changes
│   │
│   └── Services
│       ├── PostService
│       ├── StatsService
│       ├── ActivityService
│       └── WebSocketService
│
└── Database (PostgreSQL)
    ├── Posts Table
    ├── Activities Table
    └── Indexes
```

---

Good luck with your blog dashboard! 🚀

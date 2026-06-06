# Blog Dashboard - Quick Reference Guide

## 📦 Quick Start (5 minutes)

```bash
# 1. Backend setup
cd backend
npm install
cp .env.example .env
npm run prisma:migrate
npm run dev

# 2. Frontend setup (new terminal)
npm install
npm run dev

# Done! Open http://localhost:5173
```

## 🗄️ Database

```bash
# Start PostgreSQL (Docker)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15

# Or with Homebrew (macOS)
brew services start postgresql

# View database visually
npm run prisma:studio

# Reset database (caution!)
npm run prisma:migrate reset
```

## 🚀 API Endpoints Quick Reference

### Posts
```bash
POST   /api/posts                    # Create post
GET    /api/posts                    # List posts
GET    /api/posts/:id                # Get one post
PUT    /api/posts/:id                # Update post
DELETE /api/posts/:id                # Delete post
POST   /api/posts/:id/view           # Add view
POST   /api/posts/:id/like           # Add like
```

### Stats
```bash
GET /api/stats                        # All stats
GET /api/stats/posts-over-time?days=30
GET /api/stats/views-per-post
GET /api/stats/draft-vs-published
```

### Activities
```bash
GET /api/activities?limit=20          # Recent activities
GET /api/activities/post/:postId      # Post activities
```

## 📝 Create a Post Example

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "description": "Short desc",
    "content": "<p>HTML content</p>",
    "status": "PUBLISHED"
  }'
```

## 🔌 WebSocket Events

```javascript
// Subscribe to stats
socket.emit('subscribe:stats');
socket.on('stats:updated', (stats) => console.log(stats));

// Subscribe to activities
socket.emit('subscribe:activities');
socket.on('activity:new', (activity) => console.log(activity));
```

## 📂 Project Structure

```
.
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API endpoints
│   │   └── lib/            # Utilities
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
├── src/                    # React frontend
│   ├── pages/admin/        # Dashboard pages
│   └── components/         # Reusable components
└── docker-compose.yml      # Full stack
```

## 🛠️ Common Commands

### Backend
```bash
npm run dev                  # Start development
npm run build              # Build TypeScript
npm start                  # Run production build
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open database UI
npm run prisma:generate    # Regenerate types
```

### Frontend
```bash
npm run dev                # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build
```

### Docker
```bash
docker-compose up          # Start all services
docker-compose down        # Stop all services
docker-compose logs -f     # View logs
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `PORT=3001 npm run dev` |
| Port 5173 in use | Kill process: `lsof -ti:5173 \| xargs kill -9` |
| DB connection error | Check `DATABASE_URL` in `.env` |
| CORS error | Verify `FRONTEND_URL` and `CORS_ORIGIN` match |
| WebSocket timeout | Ensure backend is running on port 3000 |
| Migration failed | Delete migration folder and reset: `npm run prisma:migrate reset` |

## 📊 Database Schema

### Post Model
```typescript
{
  id: string (UUID)
  title: string (255 chars)
  description: string
  content: string (HTML)
  status: "DRAFT" | "PUBLISHED"
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}
```

### Activity Model
```typescript
{
  id: string (UUID)
  type: "CREATE" | "UPDATE" | "PUBLISH" | "VIEW" | "LIKE" | "DELETE"
  message: string
  postId: string (optional)
  createdAt: Date
}
```

## 🔐 Security

- ✅ XSS protection with HTML sanitization
- ✅ CORS restricted to frontend
- ✅ SQL injection prevented (Prisma)
- ✅ Input validation on all endpoints
- ✅ No sensitive errors exposed

## 📚 Documentation

- **API Docs**: `backend/README.md` (315 lines)
- **Setup Guide**: `BACKEND_SETUP.md` (439 lines)
- **Implementation**: `IMPLEMENTATION.md` (349 lines)
- **Postman Collection**: `backend/postman-collection.json`

## 🚢 Deployment

### Heroku
```bash
git push heroku main
```

### Docker
```bash
docker build -t blog-dashboard ./backend
docker run -p 3000:3000 blog-dashboard
```

### Vercel (Frontend)
```bash
vercel deploy
```

## 💡 Tips

1. **Use Postman** for API testing: Import `postman-collection.json`
2. **Monitor logs**: `npm run dev` shows all requests
3. **Test WebSocket**: Open console and use `socket` object
4. **Database UI**: `npm run prisma:studio` for visual DB browsing
5. **Hot reload**: Both backend and frontend support hot reloading

## 📞 Support

### Check these files for help:
1. Backend issues → `backend/README.md`
2. Setup problems → `BACKEND_SETUP.md`
3. API testing → `backend/postman-collection.json`
4. Implementation details → `IMPLEMENTATION.md`

### Common logs to check:
```bash
# Backend console
npm run dev

# Frontend browser console
F12 → Console tab

# Docker logs
docker-compose logs -f
```

## 🎯 Typical Workflow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev` (new terminal)
3. Open admin: `http://localhost:5173/admin`
4. Create post in "Writing" tab
5. See activity in "Overview" tab
6. Monitor stats in real-time

## 🔗 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/blog_dashboard
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

## 📈 Stats Endpoints Response Format

```json
{
  "totalPosts": 15,
  "totalViews": 3245,
  "totalLikes": 342,
  "draftCount": 3,
  "publishedCount": 12,
  "postsOverTime": [
    { "date": "2024-04-08", "created": 2, "published": 1 }
  ],
  "viewsPerPost": [
    { "id": "...", "title": "...", "views": 500 }
  ],
  "draftVsPublished": { "drafted": 3, "published": 12 }
}
```

---

**Ready to develop? Start with the Quick Start section above! 🚀**

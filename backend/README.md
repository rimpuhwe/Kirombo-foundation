# Blog Dashboard Backend

A scalable, production-ready backend for the Blog Dashboard System built with Node.js, Express, PostgreSQL, and Prisma.

## Features

- **RESTful API** for complete CRUD operations on blog posts
- **WebSocket Integration** for real-time updates across clients
- **Database-backed Activity Logging** for tracking all user actions
- **Comprehensive Stats & Analytics** with aggregations and time-series data
- **Input Validation & HTML Sanitization** for security
- **TypeScript** for type safety and better developer experience
- **Service Layer Architecture** for clean, maintainable code

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Real-time**: Socket.io
- **Type Safety**: TypeScript
- **Security**: XSS sanitization with `xss` library

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Initialize the database**
   ```bash
   npm run prisma:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/blog_dashboard

# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# CORS
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

### Posts

- **POST** `/api/posts` - Create a new post (draft or publish)
- **GET** `/api/posts` - List all posts with optional filters
  - Query: `?status=DRAFT|PUBLISHED`
  - Query: `?startDate=ISO&endDate=ISO`
- **GET** `/api/posts/:id` - Get a single post with activities
- **PUT** `/api/posts/:id` - Update a post
- **DELETE** `/api/posts/:id` - Delete a post
- **POST** `/api/posts/:id/view` - Increment view count
- **POST** `/api/posts/:id/like` - Increment like count

### Statistics

- **GET** `/api/stats` - Get comprehensive statistics
  - Returns: `totalPosts`, `totalViews`, `totalLikes`, `draftCount`, `publishedCount`, `postsOverTime`, `viewsPerPost`, `draftVsPublished`
- **GET** `/api/stats/posts-over-time?days=30` - Posts created over time
- **GET** `/api/stats/views-per-post` - Top posts by views
- **GET** `/api/stats/draft-vs-published` - Count of draft vs published posts

### Activities

- **GET** `/api/activities?limit=20` - Get recent activities
- **GET** `/api/activities/post/:postId` - Get activities for a specific post

### Health

- **GET** `/health` - Server health check

## Request/Response Examples

### Create a Post

**Request:**
```bash
POST /api/posts
Content-Type: application/json

{
  "title": "Getting Started with React",
  "description": "Learn the basics of React",
  "content": "<p>React is a JavaScript library...</p>",
  "status": "PUBLISHED"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Getting Started with React",
  "description": "Learn the basics of React",
  "content": "<p>React is a JavaScript library...</p>",
  "status": "PUBLISHED",
  "views": 0,
  "likes": 0,
  "createdAt": "2024-04-08T12:00:00.000Z",
  "updatedAt": "2024-04-08T12:00:00.000Z"
}
```

### Get Statistics

**Request:**
```bash
GET /api/stats
```

**Response:**
```json
{
  "totalPosts": 15,
  "totalViews": 3245,
  "totalLikes": 342,
  "draftCount": 3,
  "publishedCount": 12,
  "postsOverTime": [
    { "date": "2024-04-01", "created": 2, "published": 2 },
    { "date": "2024-04-02", "created": 1, "published": 1 }
  ],
  "viewsPerPost": [
    { "id": "...", "title": "Popular Post", "views": 500 }
  ],
  "draftVsPublished": { "drafted": 3, "published": 12 }
}
```

## WebSocket Events

### Client → Server

- `subscribe:stats` - Subscribe to stats updates
- `subscribe:activities` - Subscribe to activity feed

### Server → Client

- `stats:updated` - Stats have been updated
- `activity:new` - New activity logged
- `post:updated` - Post has been updated (views/likes/edits)

## Architecture

```
backend/
├── src/
│   ├── index.ts              # Express app & server setup
│   ├── lib/
│   │   ├── db.ts             # Prisma client singleton
│   │   └── validation.ts      # Input validation & HTML sanitization
│   ├── services/
│   │   ├── PostService.ts     # Post business logic
│   │   ├── StatsService.ts    # Analytics & stats
│   │   ├── ActivityService.ts # Activity logging
│   │   └── WebSocketService.ts # Real-time updates
│   └── routes/
│       ├── posts.ts          # POST CRUD endpoints
│       ├── stats.ts          # Stats endpoints
│       └── activities.ts      # Activity feed endpoints
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Generate Prisma Client

```bash
npm run prisma:generate
```

### View Database (Prisma Studio)

```bash
npm run prisma:studio
```

This opens a web UI at `http://localhost:5555` to browse and edit your database.

### Database Migrations

Create a new migration after schema changes:

```bash
npm run prisma:migrate
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Human-readable error message"
}
```

### Common Status Codes

- `201` - Resource created
- `200` - Success
- `400` - Validation error
- `404` - Not found
- `500` - Server error

## Security Features

1. **Input Validation** - All inputs are validated before processing
2. **HTML Sanitization** - Jodit HTML content is sanitized to prevent XSS attacks
3. **CORS Protection** - Restricted to frontend URL only
4. **SQL Injection Prevention** - Prisma parameterized queries
5. **Error Handling** - Sensitive errors are not exposed to clients

## Performance Optimizations

1. **Database Indexing** - Indexes on frequently queried fields (status, createdAt)
2. **Efficient Queries** - Selective field loading with Prisma select/include
3. **Connection Pooling** - Prisma handles connection pooling automatically
4. **Caching Ready** - Architecture supports Redis caching layer

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@prod-db-host:5432/blog_dashboard
PORT=3000
FRONTEND_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com
```

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` in `.env`
3. Run `npm run prisma:migrate` to initialize schema

### Port Already in Use

Change the PORT in `.env` or kill the process:

```bash
lsof -ti:3000 | xargs kill -9
```

### CORS Errors

Ensure `FRONTEND_URL` and `CORS_ORIGIN` match your frontend domain.

## Contributing

This backend is part of the Blog Dashboard System. Follow the main project guidelines.

## License

MIT

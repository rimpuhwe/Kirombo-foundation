#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===========================================${NC}"
echo -e "${YELLOW}Blog Dashboard - Startup Script${NC}"
echo -e "${YELLOW}===========================================${NC}\n"

# Check if PostgreSQL is running
echo -e "${YELLOW}1. Checking PostgreSQL...${NC}"
if docker ps | grep -q postgres; then
    echo -e "${GREEN}✓ PostgreSQL is running${NC}"
else
    echo -e "${YELLOW}Starting PostgreSQL...${NC}"
    docker-compose up -d postgres
    echo -e "${GREEN}✓ PostgreSQL started${NC}"
    sleep 5
fi

# Setup Backend
echo -e "\n${YELLOW}2. Setting up Backend...${NC}"
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
npx prisma migrate deploy 2>/dev/null || npx prisma migrate dev --name init
echo -e "${GREEN}✓ Database migrations complete${NC}"

# Start backend
echo -e "\n${YELLOW}Starting Backend Server...${NC}"
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"

# Setup Frontend
echo -e "\n${YELLOW}3. Setting up Frontend...${NC}"
cd ..

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# Check for .env.local
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}Creating .env.local...${NC}"
    echo "VITE_API_URL=http://localhost:3000/api" > .env.local
    echo -e "${GREEN}✓ .env.local created${NC}"
else
    echo -e "${GREEN}✓ .env.local exists${NC}"
fi

# Start frontend
echo -e "\n${YELLOW}Starting Frontend...${NC}"
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"

echo -e "\n${GREEN}===========================================${NC}"
echo -e "${GREEN}Application is running!${NC}"
echo -e "${GREEN}===========================================${NC}"
echo -e "\nFrontend: ${GREEN}http://localhost:5173${NC}"
echo -e "Backend:  ${GREEN}http://localhost:3000${NC}"
echo -e "Admin:    ${GREEN}http://localhost:5173/admin${NC}"
echo -e "\nPress Ctrl+C to stop all services\n"

# Wait for interrupt
wait

# Cleanup
echo -e "\n${YELLOW}Shutting down...${NC}"
kill $BACKEND_PID 2>/dev/null
kill $FRONTEND_PID 2>/dev/null
echo -e "${GREEN}All services stopped${NC}"

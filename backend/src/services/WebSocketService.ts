import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

export class WebSocketService {
  private io: SocketIOServer;
  private connectedClients: Map<string, string> = new Map();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    this.setupListeners();
  }

  private setupListeners() {
    this.io.on("connection", (socket) => {
      console.log(`[WebSocket] Client connected: ${socket.id}`);
      this.connectedClients.set(socket.id, socket.id);

      socket.on("subscribe:stats", () => {
        socket.join("stats");
      });

      socket.on("subscribe:activities", () => {
        socket.join("activities");
      });

      socket.on("disconnect", () => {
        console.log(`[WebSocket] Client disconnected: ${socket.id}`);
        this.connectedClients.delete(socket.id);
      });
    });
  }

  broadcastStats(stats: any) {
    this.io.to("stats").emit("stats:updated", stats);
  }

  broadcastActivity(activity: any) {
    this.io.to("activities").emit("activity:new", activity);
  }

  broadcastPostUpdated(post: any) {
    this.io.to("posts").emit("post:updated", post);
  }

  getConnectedClientsCount() {
    return this.connectedClients.size;
  }
}

let wsService: WebSocketService;

export const initWebSocket = (server: HTTPServer): WebSocketService => {
  wsService = new WebSocketService(server);
  return wsService;
};

export const getWebSocketService = (): WebSocketService => {
  if (!wsService) {
    throw new Error("WebSocket service not initialized");
  }
  return wsService;
};

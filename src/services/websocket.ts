import io, { Socket } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8080';

let socket: Socket | null = null;

export const connectWebSocket = (): Promise<Socket> => {
  return new Promise((resolve, reject) => {
    if (socket && socket.connected) {
      resolve(socket);
      return;
    }

    socket = io(WS_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('[WebSocket] Connected');
      resolve(socket!);
    });

    socket.on('connect_error', (error) => {
      console.error('[WebSocket] Connection error:', error);
      reject(error);
    });
  });
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const subscribeToStats = (
  callback: (stats: any) => void
): (() => void) => {
  connectWebSocket()
    .then((ws) => {
      ws.emit('subscribe', 'blog-stats');
      ws.on('stats-update', callback);
    })
    .catch((error) => console.error('[WebSocket] Failed to subscribe:', error));

  return () => {
    if (socket) {
      socket.off('stats-update', callback);
    }
  };
};

export const subscribeToActivities = (
  callback: (activity: any) => void
): (() => void) => {
  connectWebSocket()
    .then((ws) => {
      ws.emit('subscribe', 'activities');
      ws.on('activity', callback);
    })
    .catch((error) => console.error('[WebSocket] Failed to subscribe:', error));

  return () => {
    if (socket) {
      socket.off('activity', callback);
    }
  };
};

export const subscribeToPostUpdates = (
  callback: (post: any) => void
): (() => void) => {
  connectWebSocket()
    .then((ws) => {
      ws.emit('subscribe', 'posts-update');
      ws.on('post-updated', callback);
    })
    .catch((error) => console.error('[WebSocket] Failed to subscribe:', error));

  return () => {
    if (socket) {
      socket.off('post-updated', callback);
    }
  };
};

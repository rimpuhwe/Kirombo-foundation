import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  adminId?: string;
  adminEmail?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: "Server misconfigured: JWT_SECRET not set" });
    return;
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, secret) as { adminId: string; email: string };
    req.adminId = payload.adminId;
    req.adminEmail = payload.email;
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}

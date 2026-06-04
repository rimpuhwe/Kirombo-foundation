import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const apiKey = process.env.ADMIN_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: ADMIN_API_KEY not set" });
    return;
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  if (token !== apiKey) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}

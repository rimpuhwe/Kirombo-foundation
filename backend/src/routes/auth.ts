import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/db.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      secret,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("[POST /auth/login] Error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (error) {
    console.error("[GET /auth/me] Error:", error);
    res.status(500).json({ error: "Failed to fetch admin" });
  }
});

export default router;

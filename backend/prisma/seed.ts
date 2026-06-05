import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@abdallahkirombafoundation.com";
  const name = process.env.ADMIN_NAME ?? "Foundation Admin";
  const rawPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe@2024";

  const password = await bcrypt.hash(rawPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { name, password },
    create: { email, name, password },
  });

  console.log(`✅ Admin seeded: ${admin.email}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

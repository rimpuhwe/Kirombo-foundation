// One-off helper to refresh the local layout-preview photographs.
import { mkdir, writeFile } from "node:fs/promises";
const ids = [10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
await mkdir("public/images/gallery", { recursive: true });
await Promise.all(ids.map(async (id, index) => {
  const response = await fetch(`https://picsum.photos/id/${id}/1200/900`, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Photo ${id}: HTTP ${response.status}`);
  const filename = `preview-${String(index + 1).padStart(2, "0")}.jpg`;
  await writeFile(`public/images/gallery/${filename}`, Buffer.from(await response.arrayBuffer()));
  console.log(filename);
}));

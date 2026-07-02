import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROGRESS_FILE = path.join(__dirname, "progress.json");

export async function loadProgress() {
    try {
        const data = await fs.readFile(PROGRESS_FILE, "utf8");

        const progress = JSON.parse(data);

        return {
            query: progress.query ?? null,
            page: progress.page ?? 0,
        };
    } catch {
        return {
            query: null,
            page: 0,
        };
    }
}

export async function saveProgress(progress) {
    await fs.writeFile(
        PROGRESS_FILE,
        JSON.stringify(progress, null, 4)
    );
}
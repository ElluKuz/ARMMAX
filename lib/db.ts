// lib/db.ts
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "data", "armmax.db");

// гарантируем, что папка существует
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// создаём таблицу, если вдруг её нет
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT NOT NULL,
    service TEXT,
    details TEXT,
    attachment_path TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export default db;

-- SQLite schema for Todo app (not used directly in this JSON‑store implementation)
CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  completed INTEGER NOT NULL CHECK (completed IN (0,1))
);
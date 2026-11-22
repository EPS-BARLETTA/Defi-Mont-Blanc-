CREATE TABLE sessions (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  height INTEGER NOT NULL CHECK (height BETWEEN 1 AND 40),
  opened_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_at TEXT
);
--> statement-breakpoint
CREATE UNIQUE INDEX single_open_session ON sessions ((1)) WHERE closed_at IS NULL;
--> statement-breakpoint
CREATE TABLE climbs (
  id TEXT PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES sessions(id),
  height INTEGER NOT NULL CHECK (height BETWEEN 1 AND 40),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX climbs_by_session ON climbs(session_id);

import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

export function localDb() {
  const storage = new DatabaseSync(':memory:');
  storage.exec(readFileSync(new URL('../drizzle/0000_defi.sql', import.meta.url), 'utf8'));
  return {
    prepare(sql) {
      const statement = storage.prepare(sql);
      const bind = (...values) => ({
        first: async () => statement.get(...values) ?? null,
        all: async () => ({ results: statement.all(...values) }),
        run: async () => ({ meta: statement.run(...values) }),
        bind,
      });
      return bind();
    },
    batch(statements) { return Promise.all(statements.map(statement => statement.all())); },
  };
}

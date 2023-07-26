CREATE TABLE IF NOT EXISTS "endpoints" ("id" varchar NOT NULL, PRIMARY KEY ("id"))
--bun:split
CREATE TABLE IF NOT EXISTS "endpoint_relations" ("target_id" varchar NOT NULL, "source_id" varchar NOT NULL, PRIMARY KEY ("target_id", "source_id"))
-- Database setup for thmanyah iTunes Search API
DROP TABLE IF EXISTS itunes_items;
CREATE TABLE itunes_items (
  id SERIAL PRIMARY KEY,
  search_term VARCHAR(255) NOT NULL,
  track_id INTEGER NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_search_term ON itunes_items (search_term);
CREATE INDEX idx_track_id ON itunes_items (track_id);

GRANT ALL PRIVILEGES ON TABLE itunes_items TO postgres;
GRANT USAGE, SELECT ON SEQUENCE itunes_items_id_seq TO postgres;

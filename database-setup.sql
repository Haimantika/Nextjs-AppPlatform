-- DigitalOcean PostgreSQL Database Setup for Guestbook App
-- Run this script once to initialize your database schema

-- Create the guestbook_entries table
CREATE TABLE IF NOT EXISTS guestbook_entries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on created_at for better performance when ordering entries
CREATE INDEX IF NOT EXISTS idx_guestbook_entries_created_at ON guestbook_entries(created_at DESC);

-- Grant necessary permissions (adjust username as needed for your DO database)
-- GRANT ALL PRIVILEGES ON TABLE guestbook_entries TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE guestbook_entries_id_seq TO your_app_user;

CREATE TABLE IF NOT EXISTS boards (
    name text primary key
);

CREATE TABLE IF NOT EXISTS threads (
    id serial primary key,
    title text,
    board text references boards
);

CREATE TABLE IF NOT EXISTS posts (
    id serial primary key,
    name text,
    commentary text,
    thread integer references threads
);

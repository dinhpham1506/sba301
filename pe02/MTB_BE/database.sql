-- Run once in SSMS before starting the API.
-- Tables Genres + Movies are created automatically by Hibernate (ddl-auto=update)
-- and 6 genres + 15 sample movies are seeded on first start (DataSeeder).
IF DB_ID('SBA301_2026_PE') IS NULL
    CREATE DATABASE SBA301_2026_PE;
GO

USE SBA301_2026_PE;
GO

-- Genre used to be a text column in Movies; now it is the Genres table (Movies.genre_id FK).
-- If the old Movies table still has the text column, drop it so Hibernate recreates it
-- (sample movies are re-seeded on the next start).
IF COL_LENGTH('dbo.Movies', 'genre') IS NOT NULL
    DROP TABLE dbo.Movies;
GO

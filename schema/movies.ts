import { pgTable, serial, text, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  plot: text('plot'),
  genres: jsonb('genres'),
  runtime: integer('runtime'),
  poster: text('poster'),
  fullplot: text('fullplot'),
  languages: jsonb('languages'),
  released: timestamp('released'),
  directors: jsonb('directors'),
  rated: text('rated'),
  awards: jsonb('awards'),
  lastupdated: timestamp('lastupdated'),
  year: integer('year'),
  imdb: jsonb('imdb'),
  countries: jsonb('countries'),
  type: text('type'),
  tomatoes: jsonb('tomatoes'),
});

import { pgTable, serial, text, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { foreignKey } from 'drizzle-orm/pg-core';
import { movies } from './movies';

export const cast = pgTable('cast', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  movie_id: integer('movie_id').references(() => movies.id),
});

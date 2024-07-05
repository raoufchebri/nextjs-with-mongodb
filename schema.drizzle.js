import { pgTable, serial, text, integer, foreignKey } from 'drizzle-orm/pg-core';

export const movies = pgTable('movies', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    metacritic: integer('metacritic'),
    plot: text('plot'),
});

export const casts = pgTable('casts', {
    id: serial('id').primaryKey(),
    movie_id: integer('movie_id').references(() => movies.id),
    actor_name: text('actor_name').notNull(),
});

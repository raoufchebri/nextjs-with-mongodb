INSERT INTO movies (id, title, metacritic, plot) VALUES
('1', 'Inception', 86, 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'),
('2', 'The Matrix', 87, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'),
('3', 'Interstellar', 84, 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.');

INSERT INTO cast_members (id, name) VALUES
('1', 'Leonardo DiCaprio'),
('2', 'Joseph Gordon-Levitt'),
('3', 'Ellen Page'),
('4', 'Keanu Reeves'),
('5', 'Laurence Fishburne'),
('6', 'Carrie-Anne Moss'),
('7', 'Matthew McConaughey'),
('8', 'Anne Hathaway'),
('9', 'Jessica Chastain');

INSERT INTO movie_cast (movie_id, cast_member_id) VALUES
('1', '1'),
('1', '2'),
('1', '3'),
('2', '4'),
('2', '5'),
('2', '6'),
('3', '7'),
('3', '8'),
('3', '9');

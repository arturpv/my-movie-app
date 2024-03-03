// components/MovieList.tsx
import React from 'react';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

interface MovieListProps {
  movies: Movie[];
}

function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="border p-4">
          <img src={movie.Poster} alt={movie.Title} className="w-full h-40 object-cover mb-2" />
          <p className="text-lg font-bold">{movie.Title}</p>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;

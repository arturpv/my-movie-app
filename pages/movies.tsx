import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import MovieList from '../components/ui/MovieList';
import MoviePagination from '../components/ui/moviePagination';
import Layout from '../components/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

interface Props {
  searchTerm: string;
  movies: Movie[];
  searchedMovie: Movie | null;
  currentPage: number;
  selectedType: string;
  selectedYear: string;
  totalPages: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }: GetServerSidePropsContext) => {
  const { searchTerm = '', page, selectedType = '', selectedYear = '' } = query; // Defina valores padrão para selectedType e selectedYear

  const apiKey = 'b3e9b3df';
  let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${page}&per_page=10`;

  if (selectedType) {
    url += `&type=${selectedType}`;
  }

  if (selectedYear) {
    url += `&y=${selectedYear}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      props: {
        searchTerm: searchTerm as string,
        movies: data.Search || [],
        searchedMovie: data.Search ? data.Search[0] || null : null,
        currentPage: +page || 1,
        selectedType: selectedType as string,
        selectedYear: selectedYear as string,
        totalPages: Math.ceil(data.totalResults / 10) || 0,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        searchTerm: searchTerm as string,
        movies: [],
        searchedMovie: null,
        currentPage: +page || 1,
        selectedType: selectedType as string,
        selectedYear: selectedYear as string,
        totalPages: 0,
      },
    };
  }
};

const Movies: React.FC<Props> = ({
  searchTerm,
  movies,
  searchedMovie,
  currentPage,
  selectedType,
  selectedYear,
  totalPages,
}) => {
  const [searchTermState, setSearchTerm] = useState(searchTerm);
  const [moviesState, setMovies] = useState(movies);
  const [searchedMovieState, setSearchedMovie] = useState(searchedMovie);
  const [currentPageState, setCurrentPage] = useState(currentPage);
  const [selectedTypeState, setSelectedType] = useState(selectedType);
  const [selectedYearState, setSelectedYear] = useState(selectedYear);
  const [totalPagesState, setTotalPages] = useState(totalPages);

  const fetchMovies = async (
    query: string,
    page: number,
    type: string | null,
    year: string | null
  ) => {
    const apiKey = 'b3e9b3df';
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}&per_page=10`;

    if (type) {
      url += `&type=${type}`;
    }

    if (year) {
      url += `&y=${year}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
      setSearchedMovie(data.Search.length > 0 ? data.Search[0] : null);
      setTotalPages(Math.ceil(data.totalResults / 10));
    } else {
      setMovies([]);
      setSearchedMovie(null);
      setTotalPages(0);
    }
  };

  const handleSearch = async () => {
    await fetchMovies(searchTermState, 1, selectedTypeState, selectedYearState);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchMovies(searchTermState, page, selectedTypeState, selectedYearState);
  };

  useEffect(() => {
    const fetchMoviesAndSetState = async () => {
      await fetchMovies(searchTermState, currentPageState, selectedTypeState, selectedYearState);
    };

    fetchMoviesAndSetState();
  }, [searchTermState, currentPageState, selectedTypeState]);

  return (
    <Layout>
      <div className="flex flex-col items-center h-screen">
        <div className="w-full max-w-screen-lg flex-grow">
          <h1 className="text-3xl font-bold mb-4">Movie List</h1>

          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search for a movie"
              value={searchTermState}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 mr-2 flex-grow bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <select
              value={selectedTypeState || ''}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border p-2 bg-gray-700 text-white focus:outline-none"
            >
              <option value="">All</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
            <input
              type="text"
              placeholder="Year"
              value={selectedYearState || ''}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border p-2 bg-gray-700 text-white focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
            >
              Search
            </button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {searchTermState && (
                <div className="mb-4">
                  <p>
                    Showing results for: <strong>{searchTermState}</strong>
                  </p>
                  {searchedMovieState && (
                    <div className="mt-2">
                      <p>Poster of the searched movie:</p>
                      <img
                        src={searchedMovieState.Poster}
                        alt={searchedMovieState.Title}
                        className="max-w-full h-auto max-h-60"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>

          <MovieList movies={moviesState} />
        </div>

        <div className="mt-4">
          <MoviePagination
            currentPage={currentPageState}
            totalPages={totalPagesState}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
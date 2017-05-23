import mockMovies from './mock-movies.mock';

export default {
  page: 1,
  total_pages: 1,
  total_results: mockMovies.length,
  results: mockMovies
};
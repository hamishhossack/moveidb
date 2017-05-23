import mockMovie from './mock-movie.mock';

export default Array.apply(null, Array(10)).map(() => mockMovie);

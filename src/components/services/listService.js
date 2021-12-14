export const findMovieInLists = (lists, imdbID) => {
    for (const list of lists) {
        for (const movie of list.movies) {
            if(movie.imdbID === imdbID) {
                return list.listname;
            }
        }
    }
    return false;
}
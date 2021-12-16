import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./index.css"
import {useSelector} from "react-redux";
import Navigation from "../Navigation";

const Index = () => {
    const params = useParams();
    const navigate = useNavigate();
    const movieTitle = params.searchTerm || ''
    const [searchTerm, setSearchTerm] = useState(movieTitle);
    const [movies, setMovies] = useState([]);
    const findMovies = () =>
    {
        navigate(`/search/${searchTerm}`);
        fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=234b07dc`)
            .then(res => res.json())
            .then(results => {
                setMovies(results.Search)
            })
    }
    useEffect(findMovies, []);

    const profile = useSelector(state => state.profile);

    return(
        <div className="container mt-5">
            <Navigation active='search'/>
            <img src="/images/movieNight.png" className="mx-auto d-block bg-pic mt-5"/>
            <div className="mt-4 input-group mx-auto searchbar">
                <input
                    className="form-control rounded-pill me-3"
                    onChange={(e) =>
                        setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder="Search movie"/>
                <button
                    className="btn btn-primary rounded-pill float-end"
                    onClick={findMovies}>
                    Search
                </button>
            </div>

            <ul className="list-group mt-4">
                {
                    movies &&
                    movies.map(movie =>
                        <li key={movie.imdbID} className="list-group-item">
                            <Link to={`/details/${movie.imdbID}`}
                                  className="no-underline">
                                <div className="row">
                                    <img className="col-6 col-sm-4 col-md-3 col-lg-2 poster"
                                         src={
                                             movie.Poster === 'N/A' ? '/images/defaultPoster.png'
                                                 : movie.Poster}/>
                                    <div className="col-6 col-sm-8 col-md-9 col-lg-10 align-self-center">
                                        {movie.Title} ({movie.Year})
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                }
            </ul>
            {
                params.searchTerm && !movies &&
                <p className="text-danger text-center">
                    Sorry! Cannot find result for <b><i>{movieTitle}.</i></b>
                </p>
            }
        </div>
    )
};
export default Index;
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../Navigation";
import {findMovieInLists} from "../services/listService";
import './index.css';

const API_URL = 'http://localhost:4000/api'

const Index = () => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [writeReview, setWriteReview] = useState(false);
    const [add, setAdd] = useState(false);
    const [selectedList, setSelectedList] = useState('favourite');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const [movieDetails, setMovieDetails] = useState({Actors: '', Ratings: []});

    const findMovieDetailsByImdbID = () =>
        fetch(`https://www.omdbapi.com/?i=${params.id}&apikey=234b07dc`)
            .then(res => res.json())
            .then(movie => setMovieDetails(movie));

    const findReviewsByImdbID = () =>
        fetch(`http://localhost:4000/api/movies/${params.id}/reviews`)
            .then(res => res.json())
            .then(reviews => setReviews(reviews));

    const submitReview = () => {
        const newReview = {
            imdbID: params.id,
            movieTitle: movieDetails.Title,
            userID: profile._id,
            username: profile.username,
            review
        }
        fetch('http://localhost:4000/api/reviews', {
            method: 'POST',
            body: JSON.stringify(newReview),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(insertedReview =>
                setReviews([
                    insertedReview,
                    ...reviews
                ])
            )
    }
    const addList = () => {
        const newProfile = {
            ...profile,
            lists: profile.lists.map(list => {
                if(list.listname === selectedList) {
                    return {
                        ...list,
                        movies: [
                            {
                                imdbID: params.id,
                                movieTitle: movieDetails.Title,
                            },
                            ...list.movies
                        ]
                    }
                } else {
                    return list
                }
            })
        }
        fetch('http://localhost:4000/api/users', {
            method: 'PUT',
            body: JSON.stringify(newProfile),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => dispatch({
                type: 'update-profile',
                profile: newProfile
            }))
    }

    useEffect(() => {
        findMovieDetailsByImdbID();
        findReviewsByImdbID();
    }, []);

    // To be finished later
    const createReviewHandler = () => {
        if(!profile._id) {
            navigate('/login');
        }
        setWriteReview(true);
    }
    const cancelWriteHandler = () => {
        setWriteReview(false);
        setReview('');
    }
    const submitReviewHandler = () => {
        submitReview();
        setWriteReview(false);
        setReview('');
    }

    const addToList = () => {
        if(!profile._id) {
            navigate('/login');
        }
        setAdd(true);
    }
    const cancelAddHandler = () => {
        setAdd(false);
    }
    const addListHandler = () => {
        addList();
        setAdd(false);
    }

    return(
        <div className="container mt-5">
            <Navigation/>
            <h3 className="mt-5">
                {movieDetails.Title} ({movieDetails.Year})
                {movieDetails.Rated !== 'N/A' ? ' ' + movieDetails.Rated: ''}
            </h3>
            <div className="row mt-4">
                <img className="col-6 col-sm-6 col-md-4 col-lg-3 poster"
                     src={
                         movieDetails.Poster === 'N/A' ? '/images/defaultPoster.png'
                             : movieDetails.Poster}/>
                <div className="col-6 col-sm-6 col-md-4 col-lg-5">
                    <div>Director: {movieDetails.Director}</div>
                    <div>Writer: {movieDetails.Writer}</div>
                    <div>Actors: {movieDetails.Actors}</div>
                    <div>Genre: {movieDetails.Genre}</div>
                    <div>Country: {movieDetails.Country}</div>
                    <div>Language: {movieDetails.Language}</div>
                    <div>Release date: {movieDetails.Released}</div>
                    <div>Length: {movieDetails.Runtime}</div>
                </div>
                <div className="d-none d-sm-none d-md-block col-md-4 col-lg-4">
                    <h5>Ratings</h5>
                    <div>IMDb: {movieDetails.imdbRating}</div>
                    {
                        movieDetails.Ratings.map(rating =>
                            <div>{rating.Source}: {rating.Value}</div>)
                    }
                    <div className="mt-3">
                        {findMovieInLists(profile.lists, params.id) ?
                            <div className="text-white" style={{fontSize: '1.5em'}}>Saved in
                                <Link to='/profile' className="text-decoration-none ms-1">
                                    {findMovieInLists(profile.lists, params.id)}
                                </Link>
                            </div> :
                            <div>
                                <div style={{fontSize: '1.5em', color: 'white'}}
                                     onClick={addToList}>
                                    <i className="fas fa-plus me-2"></i>
                                    Add to a list
                                </div>
                                {add &&
                                    <div>
                                        <select className="form-select"
                                                value={selectedList}
                                                onChange={e => setSelectedList(e.target.value)}>
                                            {profile.lists.map(list =>
                                                <option value={list.listname}>{list.listname}</option>)}
                                        </select>
                                        <button
                                            className="btn btn-primary rounded-pill mt-2 ms-3 float-end"
                                            onClick={addListHandler}>
                                            Add
                                        </button>
                                        <button
                                            className="btn btn-danger rounded-pill float-end mt-2"
                                            onClick={cancelAddHandler}>
                                            Cancel
                                        </button>
                                        <div style={{clear: 'both'}}></div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h4>Storyline</h4>
                <p>{movieDetails.Plot}</p>
            </div>

            <div className="mt-4">
                <h4>Cast</h4>
                <ul className="list-group">
                    {
                        movieDetails.Actors.split(',').map(actor =>
                            <li key={actor} className="list-group-item" style={{width: "50%"}}>
                                {actor}
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="mt-4">
                <button
                    className="btn btn-success rounded-pill float-end"
                    onClick={createReviewHandler}>
                    Write a review
                </button>
                <h4>Reviews</h4>
                {writeReview &&
                    <div>
                        <textarea className="form-control border"
                                  placeholder="Write your review"
                                  rows="3"
                                  style={{backgroundColor: "black", color: "white"}}
                                  value={review}
                                  onChange={(event) =>
                                      setReview(event.target.value)}>
                        </textarea>
                        <div className="mt-2">
                            <button
                                className="btn btn-primary rounded-pill ms-3 float-end"
                                onClick={submitReviewHandler}>
                                Submit
                            </button>
                            <button
                                className="btn btn-danger rounded-pill float-end"
                                onClick={cancelWriteHandler}>
                                Cancel
                            </button>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                }
                {
                    reviews.length === 0 &&
                    <p>
                        There are no reviews about this movie yet.
                        Become the first one to write a review.
                    </p>
                }
                <ul className="list-group mt-2">
                    {
                        reviews.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1).map(review =>
                            <li key={review._id} className="list-group-item">
                                <Link to={`/profile/${review.userID}`}
                                    style={{"text-decoration": "none"}}>
                                    {review.username}
                                </Link>
                                <span className="ms-2 text-dark">{review.createdAt.split('T')[0]
                                }</span>
                                <p>{review.review}</p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};
export default Index;
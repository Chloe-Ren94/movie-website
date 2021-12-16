import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const WhatsHappening = () => {
    const [reviews, setReviews] = useState([]);

    const findAllReviews = () => {
        fetch(`https://webdev-movie-website.herokuapp.com/api/reviews`)
            .then(res => res.json())
            .then(reviews =>
                setReviews(reviews
                    .sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
                    .slice(0, 10)));
    }

    useEffect(findAllReviews, []);

    return(
        <div className="mt-5">
            <h2>What's happening in Movie Website</h2>
            {
                reviews.map(review =>
                    <li key={review._id} className="list-group-item">
                        <Link to={`/profile/${review.userID}`}
                              className="text-decoration-none me-1">
                            {review.username}
                        </Link>
                        reviewed to
                        <Link to={`/details/${review.imdbID}`}
                              className="text-decoration-none ms-1">
                            {review.movieTitle}
                        </Link>
                        <span className="ms-2 text-dark">{review.createdAt.split('T')[0]}</span>
                        <p>{review.review}</p>
                    </li>
                )
            }
        </div>
    )
}
export default WhatsHappening;
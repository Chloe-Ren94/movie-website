import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const ReviewsByReview = ({reviews}) => {
    return(
        <div className="mt-5">
            <h3>Reviews</h3>
            {
                reviews.length === 0 &&
                <p>
                    You have not written any review yet.
                </p>
            }
            <ul className="list-group mt-2">
                {
                    reviews.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1).map(review =>
                        <li key={review._id} className="list-group-item">
                            <Link to={`/details/${review.imdbID}`}
                                  style={{"text-decoration": "none"}}>
                                {review.movieTitle}
                            </Link>
                            <span className="ms-2 text-dark">{review.createdAt.split('T')[0]}</span>
                            <p>{review.review}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default ReviewsByReview;
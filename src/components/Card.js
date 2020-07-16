import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ShowImage from './ShowImage';

const Card = ({
    picture,
    showViewPictureButton = true,
}) => {

    const showViewButton = showViewPictureButton => {
        return (
            showViewPictureButton && (
                <Link to={`/picture/${picture._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Picture</button>
                </Link>
            )
        );
    }

    return (
        <div className="card card-shadow mb-3">
            <div className="card-header name">{picture.name}</div>
            <div className="card-body">
                <ShowImage item={picture} url="picture" />
                <p className="black-9"><strong>Album:</strong> {picture.album && picture.album.name}</p>
                <p className="black-8"><strong>Added on {moment(picture.createdAt).fromNow()}</strong></p>
                <br />
                <div className="text-center">
                    {showViewButton(showViewPictureButton)}
                </div>
            </div>
        </div>
    );
}

export default Card;
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { read, listRelated } from './ApiCore';
import Card from '../components/Card';

const Picture = (props) => {

    /* eslint-disable no-unused-vars */
    const [picture, setPicture] = useState({});
    const [relatedPicture, setRelatedPicture] = useState([]);
    const [error, setError] = useState(false);

    const loadSinglePicture = pictureId => {
        read(pictureId).then(data => {
            if (data.err) {
                setError(data.err);
            } else {
                setPicture(data);
                // fetch related pictures
                listRelated(data._id).then(data => {
                    if (data.err) {
                        setError(data.err);
                    } else {
                        setRelatedPicture(data);
                    }
                })
            }
        })
    }

    useEffect(() => {
        const pictureId = props.match.params.pictureId;
        loadSinglePicture(pictureId);
    }, [props]);

    return (
        <Layout title={picture && picture.name} description="Detail Picture" className="container-fluid">
            <div className="row">
                <div className="col-8">
                    {picture && <Card picture={picture} showViewPictureButton={false} />}
                </div>
                {relatedPicture.length > 0 && <div className="col-4">
                    <h4>Related Pictures</h4>
                    {relatedPicture.map((p, i) => (
                        <div key={i} className="mb-3">
                            <Card picture={p} />
                        </div>
                    ))}
                </div>}
            </div>
        </Layout>
    );
}

export default Picture;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getPictures, deletePicture } from './ApiAdmin';

const ManagePictures = () => {

    const [pictures, setPictures] = useState([]);

    const loadPictures = () => {
        getPictures().then(data => {
            if (data.err) {
                console.log(data.err);
            } else {
                setPictures(data);
            }
        })
    }

    const destroy = pictureId => {
        deletePicture(pictureId).then(data => {
            if (data.err) {
                console.log(data.err);
            } else {
                loadPictures();
            }
        })
    }

    useEffect(() => {
        loadPictures();
    }, []);

    return (
        <Layout title="Manage Pictures" description="Update or delete any picture" className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total {pictures.length} pictures</h2>
                    <hr />
                    <ul className="list-group">
                        {pictures.map((p, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{p.name}</strong>
                                <Link to={`/picture/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">Update</span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className="badge badge-danger badge-pill">Delete</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default ManagePictures;
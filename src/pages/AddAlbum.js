import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { createAlbum } from './ApiAdmin';

const AddAlbum = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setError("");
        setName(e.target.value);
    }

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create album
        createAlbum({ name })
            .then(data => {
                if (data.err) {
                    setError(data.err);
                } else {
                    setError("");
                    setSuccess(true);
                }
            });
    }

    const newAlbumForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Album</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Album should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/crud" className="text-warning">
                Back to Create
            </Link>
        </div>
    );

    return (
        <Layout title="Add a new album" description={`Ready to add a new album?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newAlbumForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
}

export default AddAlbum;
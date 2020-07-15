import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { createPicture, getAlbums } from './ApiAdmin';

const AddPicture = () => {

    const [values, setValues] = useState({
        name: '',
        albums: [],
        album: '',
        photo: '',
        loading: false,
        error: '',
        createdPicture: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        albums,
        loading,
        error,
        createdPicture,
        redirectToProfile,
        formData
    } = values;

    // load albums and set form data
    const init = () => {
        getAlbums().then(data => {
            if (data.err) {
                setValues({
                    ...values,
                    error: data.err
                });
            } else {
                setValues({
                    ...values,
                    albums: data,
                    formData: new FormData()
                });
            }
        });
    }

    useEffect(() => {
        init();
        redirectUser(); // allows display the changes when a picture is created
        // eslint-disable-next-line 
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value
        });
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: '',
            loading: true
        });
        createPicture(formData)
            .then(data => {
                if (data.err) {
                    setValues({
                        ...values,
                        error: data.err
                    })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        photo: '',
                        loading: false,
                        redirectToProfile: true,
                        createdPicture: data.name
                    });
                }
            });
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Album</label>
                <select onChange={handleChange("album")} className="form-control">
                    <option>-- Please select --</option>
                    {albums && albums.map((a, i) => (
                        <option key={i} value={a._id}>{a.name}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-outline-primary">Create Picture</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
            </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdPicture ? '' : 'none' }}>
            <h2>{`${createdPicture} is created!`}</h2>
            </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return < Redirect to="/" />
            }
        }
    }

    return (
        <Layout title="Add a new picture" description={`Ready to add a new picture?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
}

export default AddPicture;
import React, { useState, useEffect } from 'react';
import { getAlbums, list } from '../config/ApiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        albums: [],
        album: "",
        search: "",
        results: [],
        searched: false
    });

    const { albums, album, search, results, searched } = data;

    const loadAlbums = () => {
        getAlbums().then(data => {
            if (data.err) {
                console.log(data.err)
            } else {
                setData({
                    ...data,
                    albums: data
                })
            }
        })
    }

    useEffect(() => {
        loadAlbums();
    }, []);

    const searchData = () => {
        if (search) {
            list({
                search: search || undefined,
                album: album
            }).then(response => {
                if (response.err) {
                    console.log(response.err)
                } else {
                    setData({
                        ...data,
                        results: response,
                        searched: true
                    })
                }
            })
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    }

    const handleChange = name => event => {
        setData({
            ...data,
            [name]: event.target.value,
            searched: false
        })
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} pictures`
        }
        if (searched && results.length < 1) {
            return `No pictures found`
        }
    }

    const searchedPictures = (results = []) => (
        <div>
            <h2 className="mt-4 mb-4">
                {searchMessage(searched, results)}
            </h2>
            <div className="row">
            {results.map((picture, i) => (
                <Card key={i} picture={picture} />
            ))}
        </div>
        </div>
    )

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("album")}>
                            <option value="All">All</option>
                            {albums.map((a, i) => (
                                <option key={i} value={a._id}>{a.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search by name" />
                </div>
                <div className="btn input-group-append" style={{ border: "none" }}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )

    return (
        <div className="row">
            <div className="container mb-4">
                {searchForm()}
            </div>
            <div className="container-fluid mb-4">
                {searchedPictures(results)}
            </div>
        </div>
    );
}

export default Search;
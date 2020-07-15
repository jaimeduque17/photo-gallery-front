import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Checkbox from '../components/Checkbox';
import { getAlbums, getFilteredPictures } from './ApiCore';

const Filters = () => {

    /* eslint-disable no-unused-vars */
    const [myFilters, setMyFilters] = useState({
        filters: { album: [] }
    });
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getAlbums().then(data => {
            if (data.err) {
                setError(data.err);
            } else {
                setAlbums(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        getFilteredPictures(skip, limit, newFilters).then(data => {
            if (data.err) {
                setError(data.err);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredPictures(toSkip, limit, myFilters.filters).then(data => {
            if (data.err) {
                setError(data.err);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
        // eslint-disable-next-line 
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    return (
        <Layout
            title="Filter Page"
            description="Filter and find pictures of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by albums</h4>
                    <ul>
                        <Checkbox
                            albums={albums}
                            handleFilters={filters =>
                                handleFilters(filters, "album")
                            }
                        />
                    </ul>
                </div>
                <div className="col-8">
                <h2 className="mb-4">Lastest pictures created</h2>
                    <div className="row">
                        {filteredResults.map((picture, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card picture={picture} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className="text-center">
                    {loadMoreButton()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Filters;

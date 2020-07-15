import { API } from '../config';
import queryString from 'query-string';

export const getPictures = (sortBy) => {
    return fetch(`${API}/pictures?sortBy=${sortBy}&order=desc&limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getAlbums = () => {
    return fetch(`${API}/albums`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getFilteredPictures = (skip, limit, filters = {}) => {
    const data = {
        skip, limit, filters
    }
    return fetch(`${API}/pictures/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const list = params => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/pictures/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const read = pictureId => {
    return fetch(`${API}/picture/${pictureId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const listRelated = pictureId => {
    return fetch(`${API}/pictures/related/${pictureId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
import { API } from './config';

export const createAlbum = album => {
    return fetch(`${API}/album/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(album)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const createPicture = picture => {
    return fetch(`${API}/picture/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: picture
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
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

// to perform crud on picture
// get all pictures
// get a single picture
// update single picture
// delete single picture

export const getPictures = () => {
    return fetch(`${API}/pictures?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const deletePicture = pictureId => {
    return fetch(`${API}/picture/${pictureId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getPicture = pictureId => {
    return fetch(`${API}/picture/${pictureId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const updatePicture = (pictureId, picture) => {
    return fetch(`${API}/picture/${pictureId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json'
        },
        body: picture
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
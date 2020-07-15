import React, { useState } from 'react';

const Checkbox = ({ albums, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = a => () => {

        // return the first index or -1
        const currentAlbumId = checked.indexOf(a);
        const newCheckedAlbumId = [...checked];

        // if currently checked was not already in checked state then push
        // else pull/take off
        if (currentAlbumId === -1) {
            newCheckedAlbumId.push(a);
        } else {
            newCheckedAlbumId.splice(currentAlbumId, 1);
        }
        setChecked(newCheckedAlbumId);
        handleFilters(newCheckedAlbumId);
    }

    return (
        albums.map((a, i) => (
            <li key={i} className="list-unstyled">
                <input onChange={handleToggle(a._id)} value={checked.indexOf(a._id === -1)} type="checkbox" className="form-check-input" />
                <label className="form-check-label">{a.name}</label>
            </li>
        ))
    );
}

export default Checkbox;
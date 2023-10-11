import React from 'react'
import NotFound from './NotFound';

const Dogs = ({data, loading}) => {

    let images;

    if (loading) {
        images = <p>Loading...</p>;
    } else if (data.length > 0) {
        images = data.map(image => {
            let url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_n.jpg`;
            return <li key={image.id}><img src={url} alt="" /></li>;
        });
    } else if (data.length === 0) {
        images = <NotFound />
    }

    return (
        <div className="photo-container">
            <h2>Dogs</h2>
            <ul>
                {images}
            </ul>
        </div>
    );
}

export default Dogs
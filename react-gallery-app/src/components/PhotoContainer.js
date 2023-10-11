import React, {useEffect} from 'react';
import NotFound from './NotFound'
import { useParams } from 'react-router';


const PhotoContainer = ({ data, loading, query, changeQuery}) => { 
  const { topic } = useParams
  let images;
  if (loading) {
    images = <h2>Loading...</h2>;
  }else if (data.length > 0) {
    images = data.map(image => {
    let url=`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_n.jpg`
    return <li key={image.id}><img src={url} alt="" /></li>;
  });
  } else if (data.length === 0) {
    images = <NotFound />
  }
  useEffect(() => {
    if (topic) {
        changeQuery(topic);
    }
     // eslint-disable-next-line 
  }, [topic]);

  return(
    <div className="photo-container">
        <h2>{topic ? topic : query}</h2>
        <ul>
        {images}
        </ul>
    </div>
  );
}

export default PhotoContainer;

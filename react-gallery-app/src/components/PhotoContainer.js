import React, {useEffect} from 'react';
import NotFound from './NotFound'
import { useParams } from 'react-router';

// maps through the data and sets the image ulr to url and returns the resulting images 
const PhotoContainer = ({ data, loading, query, changeQuery}) => { 
  const { topic } = useParams()
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
  
//returns the topic or searched query in the h2 tag as well as the results.
  return(
    <div className="photo-container">
        <h2> <strong>Images of:</strong> {topic ? topic : query}</h2>
        <ul>
        {images}
        </ul>
    </div>
  );
}

export default PhotoContainer;

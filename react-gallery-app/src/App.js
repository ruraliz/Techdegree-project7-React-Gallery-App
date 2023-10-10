import React, {useEffect, useState }  from 'react';
// import { Route, Routes, Navigate } from "react-router-dom";
import apiKey from './components/config';
import './App.css'
import axios from "axios";
import PhotoContainer from './components/PhotoContainer'
import SearchForm from './components/SearchForm';
// import SearchForm from './components/SearchForm'

function App() {
  const [images, setimages] = useState([]);
  const [query, setQuery] = useState("rwanda");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if (activeFetch) {
          setimages(response.data.photos.photo);
          console.log(response)
          setLoading(false);
        }
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
    return () => { activeFetch = false }
  }, [query]);
  const handleQueryChange = searchText => {
    setQuery(searchText);
  }
  return (
    <div className="main-nav">
      {/* <Routes>
        <Route path="dogs" element={<PhotoContainer data={dogs} />} />
        <Route path="cats" element={<PhotoContainer data={dogs} />} />
        <Route path="computers" element={<PhotoContainer data={computers} />} />
        <Route path="/search" element={<SearchForm />} />
      </Routes> */}
      <SearchForm changeQuery={handleQueryChange} />
      <div className="photo-container">
      {
        (loading)
        ? <p>Loading...</p>
        : <PhotoContainer data={images} />
      }
      </div>
    </div>
    
  );
}

export default App


import React, {useEffect, useState }  from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import apiKey from './components/config';
import './App.css'
import axios from "axios";
import PhotoContainer from './components/PhotoContainer'
import SearchForm from './components/SearchForm';
import NotFound from './components/NotFound';
import Photo from './components/Photo';
import MainLinks from './components/MainLinks';
import Nav from './components/Nav';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("dogs");
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs]= useState([]);
  const [cats, setCats]= useState([]);
  const [computers, setComputers]= useState([]);
  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if (activeFetch) {
          if(query === "dogs"){
            setDogs(response.data.photos.photo);
          }
          else if(query === "cats"){
            setCats(response.data.photos.photo);
          }
          else if(query === "computers"){
            setComputers(response.data.photos.photo);
          }
          else{
            setImages(response.data.photos.photo);
          }
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
      <SearchForm changeQuery={handleQueryChange} />
      <Nav changeQuery={handleQueryChange}  />
      <Routes>
        <Route path="/" element={<Navigate to="/dogs" replace />} />
        <Route path="/dogs" element={<MainLinks data={dogs}  loading={loading}/>} />
        <Route path="/cats" element={<MainLinks data={cats}  loading={loading}/>} />
        <Route path="/computers" element={<MainLinks data={computers}  loading={loading}/>} />
        <Route path="/search/:topic" element={<Photo loading={loading} data={images} query={query} changeQuery={handleQueryChange} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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


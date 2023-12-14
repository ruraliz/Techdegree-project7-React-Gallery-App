import React, {useEffect, useState }  from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
//import api key
import apiKey from './components/config';
//import components 
import './App.css'
import PhotoContainer from './components/PhotoContainer'
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PageNotFound from './components/PageNotFound';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("dogs");
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs]= useState([]);
  const [cats, setCats]= useState([]);
  const [computers, setComputers]= useState([]);
  const fetchData = (query) =>{ //fetch data from api and sets response to associated variables 
    setLoading(true);
    let activeFetch = true;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if (activeFetch) {
          if(query === "dogs"){
            setDogs(response.data.photos.photo);
          }else if(query === "cats"){
            setCats(response.data.photos.photo);
          }else if(query === "computers"){
            setComputers(response.data.photos.photo);
          }else{
            setImages(response.data.photos.photo);
          }
          setLoading(false);
        }
      })
      .catch(error => { //error logged in console when there is an issue fetching data
        console.log("Error fetching and parsing data", error);
      });
    return () => { activeFetch = false }
  }
  const handleQueryChange = (query) => {
    setQuery(query);
    fetchData(query);
  };
  useEffect(() => {
    if (!dogs.length) {
      fetchData("dogs");
    }
    if(!cats.length){
      fetchData("cats")
    }
    if(!computers.length){
      fetchData("computers")
    }
  }, [dogs.length, cats.length, computers.length,]);

  return (
    <div className="App">
      <SearchForm changeQuery={handleQueryChange} />
      <Nav changeQuery={handleQueryChange}  />
      <Routes>
        <Route path="/" element={<Navigate replace to="/dogs" />} />
        <Route path="/dogs" element={<PhotoContainer data={dogs} loading={loading} query={"dogs"} changeQuery={handleQueryChange} />} />
        <Route path="/cats" element={<PhotoContainer data={cats} loading={loading} query={"cats"} changeQuery={handleQueryChange} />} />
        <Route path="/computers" element={<PhotoContainer data={computers} loading={loading} query={"computers"} changeQuery={handleQueryChange} />} />
        <Route path="/search/:topic" element={<PhotoContainer loading={loading} data={images} query={query} changeQuery={handleQueryChange} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    
  );
}

export default App


import React, {useEffect, useState }  from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import apiKey from './components/config';
import './App.css'
import axios from "axios";
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
  
  const fetchData = (query) => {
    setLoading(true);
    let activeFetch = true;
    axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    ).then(response => {
      if (activeFetch) {
        if (query === "dogs") {
          setDogs(response.data.photos.photo);
        } else if (query === "cats") {
          setCats(response.data.photos.photo);
        } else if (query === "computers") {
          setComputers(response.data.photos.photo);
        } else {
          setImages(response.data.photos.photo)
        }
        setLoading(false);
      }
    })
      .catch(error => {
        console.log("This is the error: ", error);
      });

    return () => { activeFetch = false; }
  };

  const changeQuery = (newQuery) => {
    setQuery(newQuery);
  };


  useEffect(() => {
    fetchData(query);
  }, [query]);

  // const fetchData = (query) =>{
  //   setLoading(true);
  //   let activeFetch = true;
  //   axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  //     .then(response => {
  //       if (activeFetch) {
  //         if(query === "dogs"){
  //           setDogs(response.data.photos.photo);
  //         }else if(query === "cats"){
  //           setCats(response.data.photos.photo);
  //         }else if(query === "computers"){
  //           setComputers(response.data.photos.photo);
  //         }else{
  //           setImages(response.data.photos.photo);
  //         }
  //         setLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       console.log("Error fetching and parsing data", error);
  //     });
  //   return () => { activeFetch = false }
  // }
  // const handleQueryChange = (searchText) => {
  //   setQuery(searchText);
  // };
  // useEffect(() => {
  //   fetchData(query);
  // }, [query]);

  return (
    <div className="App">
      <SearchForm changeQuery={changeQuery} />
      <Nav changeQuery={changeQuery}  />
      <Routes>
        <Route path="/" element={<Navigate replace to="/dogs" />} />
        <Route path="/dogs" element={<PhotoContainer data={dogs} loading={loading} query={"dogs"} changeQuery={changeQuery}/>} />
        <Route path="/cats" element={<PhotoContainer data={cats} loading={loading} query={"cats"} changeQuery={changeQuery} />} />
        <Route path="/computers" element={<PhotoContainer data={computers} loading={loading} query={"computers"} changeQuery={changeQuery} />} />
        <Route path="/search/:topic" element={<PhotoContainer loading={loading} data={images} query={query} changeQuery={changeQuery} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    
  );
}

export default App


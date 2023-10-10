import React, { useRef } from 'react';
import { useNavigate } from 'react-router';

const SearchForm = props => {
  const searchText = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    const searchTerm = searchText.current.value
    if(searchTerm=== 'cats'){
        navigate('/cats');
    }else if(searchTerm=== 'dogs'){
        navigate('/dogs');
    }else if(searchTerm=== 'computers'){
        navigate('/computers');
    }else{
        props.changeQuery(searchTerm );
        navigate(`/search/${searchTerm}`);
    }
    e.currentTarget.reset();
  }

  return (
    <form className="search-form" onSubmit={e => handleSubmit(e)} >
      <label className="is-hidden" htmlFor="search">Search</label>
      <input type="search" 
             ref={searchText}
             name="search" 
             placeholder="Search..." />
      <button type="submit" id="submit" className="search-button"><i className="material-icons icn-search">search</i></button>
    </form>      
  );
}

export default SearchForm;
import React from 'react';
import SearchBar from './SearchBar';
import Articles from "./Articles";
import {Helmet} from "react-helmet-async"

const Search = () => (
    <div className="container">
        <Helmet>
            <title>Search Articles | search newspaper articles by Joe Albright and Marcia Kunstel | PRINT | tworeporters.com</title>
            <meta name="description" content="Over 3000 newspaper articles have been scanned and indexed to create a searchable database of the lifework of Marcia Kunstel and Joe Albright.  Articles can be found by headline, OCR versions of the copy, author, Volume and publication." />
        </Helmet>
        <h2 className="page-title">Search Articles</h2>
        <div className="page-intro">
            <p>Type in the words or phrases you would like to find in the search form.  To search for a name or exact phrase, enclose it in double quotes (i.e., "Nelson Mandela").</p>
            <p>For more fine grain control over your search, click "more options" to access additional search options such as publication, volume, date and words to be excluded.</p>
        </div>
        <SearchBar />
        <Articles title="Search Results" />
    </div>
);

export default Search;
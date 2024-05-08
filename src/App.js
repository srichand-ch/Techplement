// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuoteList.js';
import Footer from "./Footer";

import React, { useState, useEffect } from 'react';   
import QuoteList from './QuoteList.js';



function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [todaysDate, setTodaysDate] = useState('');

  useEffect(() => {
    fetchQuoteOfTheDay();
    fetchTodaysDate();
  }, []);

  const fetchQuoteOfTheDay = async () => {
    try {
      // const response = await fetch('http://localhost:5000/api/quote');
      const response = await fetch('https://only-backend-1.onrender.com/api/quote');
      const data = await response.json();
      console.log('Quote of the day: ', data);
      setQuote(data.q);
      setAuthor(data.a);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const searchQuotes = async () => {
    try {
      // const response = await fetch(`http://localhost:5000/api/quotes/${searchTerm}`);
      const response = await fetch(`https://only-backend-1.onrender.com/api/quotes/${searchTerm}`);
      const data = await response.json();
      console.log('Response data:', data);
      setSearchResults(data);
    } catch (error) {
      <div>No quotes</div>
      console.error('No quotes found for author', error);
    }
  };

  const fetchTodaysDate = () => {
    const today = new Date();
    const options = {weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'};
    const formattedDate = today.toLocaleDateString('en-india',options);
    setTodaysDate(formattedDate);
  };


  return (
    <div>
        <header className="text-center mt-5">
          <h1>Quote of the Day</h1>
        </header>
      <div className="container">
        <div className="quote-container text-center mt-4">
          <p className="quote"> "{quote}"</p>
          <p className="author">~ {author}</p>
          <p className="date">{todaysDate}</p>
        </div>
        <div className="search-container text-center mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by author name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={searchQuotes}>Search</button>
        </div>
      </div>
    
      {/* <div>
      {searchResults.length > 0 ? (
        <div>
          <h2 className="text-center" >Quotes by {searchTerm}:</h2>
          <QuoteList quotes={searchResults} />
        </div>
      ) : (
        <div className="text-center mt-4">No quotes found for the author "{searchTerm}"</div>
      )}
      </div> */}

      <div>
        {searchTerm && searchResults.length > 0 ? (
          <div>
            {/* <h2 className="text-center">Quotes by {searchTerm}:</h2> */}
            <QuoteList quotes={searchResults} />
          </div>
        ) : (
          <div className="text-center mt-4">
            {searchTerm ? (
              "No quotes found for the author \"" + searchTerm + "\""
            ) : (
              "Type author name to search for quotes"
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

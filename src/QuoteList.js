import React from 'react';
import './quotelist.css';

function QuoteList({ quotes }) {
  return (
    <div className="quote-list mt-4">
      <ul className="list-group">
        {quotes.map((quote, index) => (
          <li key={index} className="list-group-item">{quote.q} <p>~{quote.a}</p> </li>
        ))}
      </ul>
    </div>
  );
  
}

export default QuoteList;



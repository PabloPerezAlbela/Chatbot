import React, { useState } from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';
import QueryResult from '../components/QueryResult';

function App() {

  const [searchfield, setSearchfield] = useState('');
  const [queryresult, setQeryresult] = useState('');
  const [currentpage, setCurrentpage] = useState('');

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const onSend = async () => {

    setQeryresult('');

    const result = await fetch('http://localhost:3000/query', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: searchfield,
        currentPage: currentpage
      }),
    });
    const response = await result.json();

    if (response) {
      console.log("intent:    ",response.intentResult);
      setQeryresult(response.response);
      setCurrentpage(response.currentPage);
    } else {
      setQeryresult("No se encontró respuesta");
    }
  }

  const onRestart = async () => {

    setQeryresult('');
    setSearchfield('');
    setCurrentpage('');

  }

  return (
    <div className="tc">
      <h1 className="f2">chatbot</h1>
      <SearchBox searchChange={onSearchChange} onSend={onSend} onRestart={onRestart} />
      <QueryResult queryresult={queryresult} />

    </div>
  );
}

export default App;

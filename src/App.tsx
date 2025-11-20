import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchConstellationHistory } from './api/constellation';

function App() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await fetchConstellationHistory();
      setHistory(result);
      setLoading(false);
    })();
  }, []);

  if(loading) return <div>Loading Constellation Data...</div>

  return (
    <div style={{ padding: "20px"}}>
      <h1>Constellation Flight History</h1>
      {history.map((entry) => (
        <div key={entry.hourAgo} style={{ marginBottom: "20px"}}>
          <h3>{entry.hourAgo} hours ago.</h3>
          <pre>{JSON.stringify(entry.data, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;

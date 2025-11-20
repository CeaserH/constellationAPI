import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchConstellationHistory, ConstellationEntry } from './api/constellation';

const DataDisplay: React.FC<{ data: any }> = ({ data }) => {
  if (!data || typeof data !== 'object') {
    return <div>No structured data available for this hour.</div>;
  }

  const keys = Object.keys(data);

  return (
    <div 
      style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '10px 0' 
      }}
    >
      {keys.length === 0 ? (
        <p>No constellation data reported for this time.</p>
      ) : (
        keys.map(key => {
          const value = data[key];
          
          if (typeof value === 'object' && value !== null) {
            return (
              <div 
                key={key} 
                style={{ 
                  flex: '0 0 280px',
                  border: '1px solid #ddd', 
                  padding: '15px', 
                  borderRadius: '8px',
                  backgroundColor: '#fff', 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <p style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                  Flight ID: {key}
                </p>
                
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {Object.keys(value).map(propKey => (
                    <li key={propKey} style={{ lineHeight: '1.5' }}>
                      <span style={{ fontWeight: '500', color: '#555' }}>{propKey}:</span> {JSON.stringify(value[propKey], null, 2)}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          
          return null; 
        })
      )}
    </div>
  );
};

function App() {
  const [history, setHistory] = useState<ConstellationEntry[]>([]);
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
      <h1>Constellation Flight History (Last {history.length} Hours Available)</h1>
      {history.map((entry) => (
        <div key={entry.hourAgo} style={{ marginBottom: "20px", border: '1px solic #ccc', padding: '10px'}}>
          <h3>{entry.hourAgo === 0 ? 'Current Position (00.json)' : `${entry.hourAgo} hours ago (${entry.hourAgo.toString().padStart(2, '0')}.json)`}</h3>
          {/* <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{JSON.stringify(entry.data, null, 2)}</pre> */}
          <DataDisplay data={entry.data} />
        </div>
      ))}
    </div>
  );
}

export default App;

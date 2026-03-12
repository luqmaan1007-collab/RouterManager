import React, { useState, useEffect } from 'react';
import './App.css';

// Point this to your Node.js Backend IP
const BACKEND_URL = "http://192.168.1.1:3000"; 

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to scan the network (Sök)
  const scanNetwork = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/scan`);
      const data = await response.json();
      setDevices(data.devices || []);
    } catch (error) {
      console.error("Error scanning network:", error);
      alert("Kunde inte ansluta till routern. Kontrollera backend.");
    } finally {
      setLoading(false);
    }
  };

  // Function to block or unblock a device
  const toggleBlock = async (mac, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block';
    try {
      const response = await fetch(`${BACKEND_URL}/${action}/${mac}`);
      if (response.ok) {
        alert(`Enhet ${isBlocked ? 'tillåten' : 'blockerad'}`);
        scanNetwork(); // Refresh the list automatically
      }
    } catch (error) {
      alert("Ett fel uppstod vid ändring av enhetsstatus.");
    }
  };

  // Run scan automatically when the page loads
  useEffect(() => {
    scanNetwork();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1>RouterManager</h1>
          <p>Status: Online</p>
        </div>
        <button 
          className="scan-btn" 
          onClick={scanNetwork} 
          disabled={loading}
        >
          {loading ? 'Söker...' : 'Sök Nätverk'}
        </button>
      </header>

      <div className="device-list">
        {devices.length === 0 && !loading ? (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            Inga enheter hittades. Klicka på Sök.
          </p>
        ) : (
          devices.map((device) => (
            <div className="device-card" key={device.mac}>
              <div className="device-info">
                <h3>{device.name || "Okänd Enhet"}</h3>
                <p>{device.ip} • {device.mac}</p>
              </div>
              <button 
                className={`action-btn ${device.blocked ? 'btn-unblock' : 'btn-block'}`}
                onClick={() => toggleBlock(device.mac, device.blocked)}
              >
                {device.blocked ? 'Tillåt' : 'Blockera'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;


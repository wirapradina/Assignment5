import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://api.currencyfreaks.com/v2.0/rates/latest", {
          params: {
            apikey: '4c565e5d848f48ceb8f50b88771a32e3',
            symbols: 'CAD,EUR,IDR,JPY,CHF,GBP'
          }
        });
        console.log(response.data.rates);
        setRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  const calculateRate = (rate, percentage) => {
    return parseFloat(rate) + parseFloat(rate * percentage);
  };

  return (
    <div className="container">
      <div className="box">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate], index) => (
              <tr key={index}>
                <td>{currency}</td>
                <td>{calculateRate(rate, 0.05).toFixed(4)}</td>
                <td>{parseFloat(rate).toFixed(4)}</td>
                <td>{(parseFloat(rate) - parseFloat(rate * 0.05)).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="copyright">
          <p>Rates are based on 1 USD</p>
          <p>This application uses API from <a href="https://currencyfreaks.com" target="_blank" rel="noopener noreferrer">currencyfreaks.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TownsPage } from './pages/towns/towns.page';
import { MeteoStationsPage } from './pages/meteo-stations/meteo-stations.page';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TownsPage/>}/>
        <Route path="towns" element={<TownsPage/>}/>
        <Route path="meteostations" element={<MeteoStationsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
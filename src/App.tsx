import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TownsPage } from './pages/towns/towns.page';
import { MeteoStationsPage } from './pages/meteo-stations/meteo-stations.page';
import { MeteoDataPage } from './pages/meteo-data/meteo-data.page';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ToolbarComponent></ToolbarComponent>
      <Routes>
        <Route path="/" element={<TownsPage/>}/>
        <Route path="towns" element={<TownsPage/>}/>
        <Route path="meteostations" element={<MeteoStationsPage/>}/>
        <Route path="meteodata/:id" element={<MeteoDataPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
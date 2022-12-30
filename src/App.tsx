import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShellComponent } from './components/shell/shell.component';
import { TownsPage } from './pages/towns/towns.page';
import { MeteoStationsPage } from './pages/meteo-stations/meteo-stations.page';
import { MeteoDataPage } from './pages/meteo-data/meteo-data.page';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ShellComponent>
        <Routes>
          <Route path="/" element={<TownsPage/>}/>
          <Route path="towns" element={<TownsPage/>}/>
          <Route path="meteostations" element={<MeteoStationsPage/>}/>
          <Route path="meteodata/:id" element={<MeteoDataPage/>}/>
        </Routes>
      </ShellComponent>
    </BrowserRouter>
  );
}

export default App;
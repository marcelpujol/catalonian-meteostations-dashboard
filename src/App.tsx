import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShellComponent } from './components/shell/shell.component';
import { TownsPage } from './pages/towns/towns.page';
import { MeteoStationsPage } from './pages/meteo-stations/meteo-stations.page';
import { MeteoDataPage } from './pages/meteo-data/meteo-data.page';
import { useSelector } from 'react-redux';
import './App.scss';

function App() {
  const themeMode = useSelector<any, any>(state => state.theme.mode);
  return (
    <div className="app-container" data-theme={themeMode}>
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
    </div>
  );
}

export default App;
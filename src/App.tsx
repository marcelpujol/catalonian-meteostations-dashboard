import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ListComponent } from './components/list/list.component';
import { MeteoStationsPage } from './pages/meteo-stations/meteo-stations.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListComponent/>}/>
        <Route path="towns" element={<ListComponent/>}/>
        <Route path="meteostations" element={<MeteoStationsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

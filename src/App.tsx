import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './App/view/Header/Header';
import Garage from './App/view/Garage/Garage';
import Winners from './App/view/Winners/Winners';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Header />} /> */}
        <Route path="/garage" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </div>
  );
}

export default App;

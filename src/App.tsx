import './App.css';

import { Route, Routes } from 'react-router-dom';

import { InstructionsPage } from './pages/InstructionsPage/InstructionsPage';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { PlayGame } from './pages/PlayGame/PlayGame';

function App() {
  return (
    <Routes>
      <Route path="/Carcassonne-Challenge/" element={<LandingPage />} />
      <Route path="/Carcassonne-Challenge/play" element={<PlayGame />} />
      <Route path="/Carcassonne-Challenge/howtoplay" element={<InstructionsPage />} />
    </Routes>
  );
}

export default App;

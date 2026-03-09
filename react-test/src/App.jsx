import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import DebouncedSearch from './pages/DebouncedSearch';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debouncedsearch" element={<DebouncedSearch />} />
    </Routes>
  )
}

export default App

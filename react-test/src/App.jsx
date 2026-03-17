import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DebouncedSearch from './pages/DebouncedSearch';
import AutoComplete from './pages/AutoComplete';
import TodoApp from './pages/TodoApp';
import ImageCrousel from './pages/ImageCrousel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debouncedsearch" element={<DebouncedSearch />} />
      <Route path="/autocomplete" element={<AutoComplete />} />
      <Route path="/todo-app" element={<TodoApp />} />
      <Route path='/image-crousel' element={<ImageCrousel/>}/>
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DebouncedSearch from './pages/DebouncedSearch';
import AutoComplete from './pages/AutoComplete';
import TodoApp from './pages/TodoApp';
import ImageCrousel from './pages/ImageCrousel';
import InfiniteScroll from './pages/InfiniteScroll';
import Pagination from './pages/Pagination';
import SlideShow from './pages/SlideShow';
import ContactForm from './pages/ContactForm';
import LetterTiles from './pages/LetterTiles';
import PhonebookForm from './pages/PhonebookForm';
import QuizApp from './pages/QuizApp';
import TicTacToe from './pages/TicTacToe';
import Test from './pages/Test';
import NestedProducts from './pages/NestedProducts';
import TypeContactForm from './pages/TypeContactForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debouncedsearch" element={<DebouncedSearch />} />
      <Route path="/autocomplete" element={<AutoComplete />} />
      <Route path="/todo-app" element={<TodoApp />} />
      <Route path='/image-crousel' element={<ImageCrousel />} />
      <Route path='/infinite-scroll' element={<InfiniteScroll />} />
      <Route path='/pagination' element={<Pagination />} />
      <Route path='/slideshow' element={<SlideShow />} />
      <Route path='/contact-form' element={<ContactForm />} />
      <Route path='/letter-tiles' element={<LetterTiles />} />
      <Route path='/phonebook-form' element={<PhonebookForm />} />
      <Route path='/quiz-app' element={<QuizApp />} />
      <Route path='/tic-tac-toe' element={<TicTacToe />} />
      <Route path='/nested-products' element={<NestedProducts />} />
      <Route path='/type-contact-form' element={<TypeContactForm />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  );
}

export default App;

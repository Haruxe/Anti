import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import Modal from './components/Modal';

function App() {

  return (
    <div>
      <div id='modal'>
      </div>
      <div id='page'>
      <Router>
        <Navbar />
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;

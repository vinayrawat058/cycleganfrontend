import './App.css';
import Header from './components/header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import DragandDrop from './components/dragdrop';
function App() {
  return (
    <>
    <Header/>
    <div className='container'>
      <DragandDrop/>
    </div>
    </>
  );
}

export default App;

import './App.css';
import Header from './components/header';
import Fotter from './fotter/Fotter';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import DragandDrop from './components/dragdrop';
function App() {
  return (
    <>
    <Header/>
    <div className='container'>
      <DragandDrop/>
    </div>
    <Fotter/>
    </>
  );
}

export default App;

import React from 'react';
import boston1 from './assets/boston1.jpeg';
import boston2 from './assets/boston2.jpeg';
import boston3 from './assets/boston3.jpeg';

import './App.css';

const App = () => (
  <div className='App'>
    <h1>Cache Dinámico </h1>
    <div className='image-container'>
      <img src={boston1} alt="boston" className='image' />
      <img src={boston2} alt="boston" className='image' />
      <img src={boston3} alt="boston" className='image' />
    </div>
  </div>
);
export default App;
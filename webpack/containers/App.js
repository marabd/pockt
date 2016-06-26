import React from 'react';
import Expense from '../components/Expense';
import Income from '../components/Income';

const App = ({ children }) => (
  <div>
    <h3 className='center'>Pockts</h3>
    { children }
    <Expense/>
    <Income/>
  </div>
)

export default App;

// import both components at the top
// two components returned within one div
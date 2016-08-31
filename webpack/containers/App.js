import React from 'react';
import Expense from '../components/Expense';
import Income from '../components/Income';

const App = ({ children }) => (
  <div className='container'>
    <h1 className='center'>Pockts</h1>
    	<div className='row'>
    	{ children }
    		<Income/>
    	</div>
  </div>
)

export default App;

// import both components at the top
// two components returned within one div

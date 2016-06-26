import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import Income from './components/Income';
import Expense from './components/Expense';

export default (
  <Route>
    <Route path="/" component={App}>
    	<IndexRoute component={Income} />
    	<IndexRoute component={Expense} />
  	</Route>
    
  	<Route path="*" status={404} component={NoMatch}/>
  </Route>
)
import logo from './logo.svg';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import VLanding from './views/landing';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <VLanding/>
          </Route>
          <Route path='*'>
            <div>
            </div>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

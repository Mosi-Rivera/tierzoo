import logo from './logo.svg';
import {useState} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import VLanding from './views/landing';
import VHome from './views/home';
import './App.css';
import Navbar from './components/navbar';

function App() {
  const [user,set_user] = useState(null);
  const [team,set_team] = useState([]);
  const [opponents,set_opponents] = useState([]);
  const [hero_info,set_hero_info] = useState(null);
  const props = {
    set_user: (data) => {set_user(data)},
    set_team: (data) => {console.log(data); set_team(data)},
    set_opponents: (data) => {console.log(data);set_opponents(data)}, 
    opponents,
    user,
    team,
  }
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <VLanding set_user={set_user}/>
          </Route>
          <Route path='*'>
            <div>
              <Switch>
                <Route path='*'>
                  <VHome {...props}/>
                </Route>
              </Switch>
              <Navbar/>
            </div>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

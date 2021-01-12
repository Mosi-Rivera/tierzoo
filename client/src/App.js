import logo from './logo.svg';
import {useState} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import VLanding from './views/landing';
import VHome from './views/home';
import AnimalModal from './components/animal_modal';
import './App.css';

function App() {
  const [user,set_user] = useState(null);
  const [team,set_team] = useState([]);
  const [show_animal,set_show_animal] = useState(null);
  const props = {
    set_user,
    set_team,
    user,
    team,
    show_animal,
    set_show_animal
  }
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <VLanding set_user={set_user}/>
          </Route>
          <Route path='*'>
            <div>
              <AnimalModal show={!!show_animal} data={show_animal} onHide={() => set_show_animal(null)}/>
              <Switch>
                <Route path='*'>
                  <VHome {...props}/>
                </Route>
              </Switch>
            </div>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

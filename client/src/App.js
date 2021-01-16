import logo from './logo.svg';
import {useState} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import VLanding from './views/landing';
import VHome from './views/home';
import './App.css';
import Navbar from './components/navbar';
import Heros from './views/heros';
import Summon from './views/summon';
import ModalProfile from './components/modals/modal_profile';
import ModalInventory from './components/modals/modal_inventory';
import ModalRewards from './components/modals/modal_rewards';
import ModalSummons from './components/modals/modal_summons';
import HeroInfo from './views/hero_info';
const modal_keys = {
  profile: 1,
  inventory: 2,
  summons: 3,
  rewards: 4
}

function App() {
  const [user,set_user] = useState(null);
  const [team,set_team] = useState([]);
  const [opponents,set_opponents] = useState([]);
  const [heros,set_heros] = useState([]);
  const [summons,set_summons] = useState(null);
  const [rewards,set_rewards] = useState(null);
  //1 = profile | 2 = inventory | 3 = summons | 4 = rewards
  const [show_modal,set_show_modal] = useState(0);
  const show_inventory = () => set_show_modal(modal_keys.inventory);
  const show_profile = () => set_show_modal(modal_keys.profile);
  const show_summons = () => set_show_modal(modal_keys.summons);
  const show_rewards = () => set_show_modal(modal_keys.rewards);
  const [hero_info,set_hero_info] = useState(null);
  const [inventory,set_inventory] = useState(null);
  const [prizes,set_prizes] = useState(null);
  const close_modal = () => set_show_modal(0);
  const navbar_props = {
    inventory,
    prizes,
    show_inventory,
    set_inventory,
    set_prizes,
    show_rewards,
    set_rewards
  }
  const home_props = {
    team,
    set_team,
    opponents,
    set_opponents,
    user,
    set_user
  }
  const heros_props = {
    heros,
    set_heros
  }
  const summon_props = {
    summons,
    set_summons,
    inventory,
    set_inventory,
    show_summons
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
                <Route path='/hero-info'>
                  <HeroInfo/>
                </Route>
                <Route path='/heros'>
                  <Heros {...heros_props}/>
                </Route>
                <Route path='/summon'>
                  <Summon {...summon_props}/>
                </Route>
                <Route path='*'>
                  <VHome {...home_props}/>
                </Route>
              </Switch>
              <ModalInventory handleClose={close_modal}   inventory={inventory} show={show_modal == modal_keys.inventory}/>
              <ModalProfile   handleClose={close_modal}   user={user}           show={show_modal == modal_keys.profile}/>
              <ModalSummons   handleClose={close_modal}   summons={summons}     show={show_modal == modal_keys.summons}/>
              <ModalRewards   handleClose={close_modal}   rewards={rewards}     show={show_modal == modal_keys.rewards}/>
              <Navbar {...navbar_props}/>
            </div>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;

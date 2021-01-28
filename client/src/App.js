import {Switch,Route, useHistory} from 'react-router-dom';
import VLanding from './views/landing';
import VHome from './views/home';
import './App.css';
import NavbarBottom from './components/navbar_bottom';
import Heroes from './views/heroes';
import Summon from './views/summon';
import ModalProfile from './components/modals/modal_profile';
import ModalInventory from './components/modals/modal_inventory';
import ModalRewards from './components/modals/modal_rewards';
import ModalSummons from './components/modals/modal_summons';
import HeroInfo from './components/hero_info';
import { Container } from 'react-bootstrap';
import NavbarTop from './components/navbar_top';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tick } from './redux/reducers/r_idle';
import ModalEnemyView from './components/modals/modal_enemy_view';
let interval = null;
function App() {
  const dispatch = useDispatch();
  useEffect(function(){
    interval = setInterval(() => {
      dispatch(tick());
    }, 60000);
    return () => clearInterval(interval);
  },[]);
  return (
        <Switch>
          <Route exact path='/'>
            <VLanding/>
          </Route>
          <Route path='*'>
              <Container fluid>
                <NavbarTop/>
                <Switch>
                  <Route path='/heroes'>
                    <Heroes/>
                  </Route>
                  <Route path='/summon'>
                    <Summon/>
                  </Route>
                  <Route path='*'>
                    <VHome/>
                  </Route>
                </Switch>
              <HeroInfo/>
              <ModalEnemyView/>
              <ModalInventory/>
              <ModalProfile/>
              <ModalSummons/>
              <ModalRewards/>
              <NavbarBottom/>
            </Container>
          </Route>
        </Switch>
  );
}

export default App;

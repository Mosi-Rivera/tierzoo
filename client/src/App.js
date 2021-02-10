import { useEffect,lazy,Suspense }  from 'react';
import {useDispatch} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
const VLanding      = lazy(() => import('./views/landing'));
const VHome         = lazy(() => import('./views/home'));
const NavbarBottom  = lazy(() => import('./components/navbar_bottom'));
const Heroes        = lazy(() => import('./views/heroes'));
const Summon        = lazy(() => import('./views/summon'));
const ModalProfile  = lazy(() => import('./components/modals/modal_profile'));
const ModalInventory= lazy(() => import('./components/modals/modal_inventory'));
const ModalRewards  = lazy(() => import('./components/modals/modal_rewards'));
const Container     = lazy(() => import('react-bootstrap/Container'));
const NavbarTop     = lazy(() => import('./components/navbar_top'));

let interval = null;
function App() {
  const dispatch = useDispatch();
  useEffect(function(){
    (async function()
    {
      const {tick} =  await import('./redux/reducers/r_idle');
      interval = setInterval(() => {
        dispatch(tick());
      }, 60000);
    })();
    return () => clearInterval(interval);
  },[]);
  return (
      <Switch>
          <Route exact path='/'>
            <Suspense fallback={<div>loading</div>}>
              <VLanding/>
            </Suspense>
          </Route>
          <Route path='*'>
            <Suspense fallback={<div>loading</div>}>
              <Container fluid>
                  <Suspense fallback={<div>loading</div>}>
                    <NavbarBottom/>
                    <NavbarTop/>
                  </Suspense>
                  <Suspense fallback={<div>landing</div>}>
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
                  </Suspense>
                  <Suspense fallback={<div>loading</div>}>
                    <ModalInventory/>
                    <ModalProfile/>
                    <ModalRewards/>
                  </Suspense>
              </Container>
            </Suspense>
          </Route>
        </Switch>
  );
}

export default App;
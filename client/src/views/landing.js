import {Suspense, lazy, useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { is_logged_in } from '../api/routes/auth';
import Col          from 'react-bootstrap/Col';
import Row          from 'react-bootstrap/Row';
import Container    from 'react-bootstrap/Container';

const AuthModal = lazy(() => import("../components/modals/modal_auth"));

function ViewLanding ()
{
    const history = useHistory();
    const [merchant_class,set_merchant_class] = useState('');
    const [show_auth,set_show_auth] = useState(false);
    useEffect(function(){
        let to_1 = setTimeout(() => {
            set_merchant_class('merchant-idle'); to_1 = null;
        },1000);
        let to_2 = setTimeout(() => {
            set_merchant_class('merchant-walk');
            to_2 = null;
        },0);
        is_logged_in()
        .then(() => history.push('/home'))
        .catch(err => {});
        return function ()
        {
            clearTimeout(to_1);
            clearTimeout(to_2);
        }
    },[]);
    return (
        <Container fluid>
            <nav id='navbar-top' className='shadow'>
                <h5>AFK ASSAULT</h5>
            </nav>
            <div id='landing' className='pseudo-body'>
                <div className='c-cta'>
                    <Row>
                        <Col md={6}>
                            <div className='title'>
                                <h1>DON'T BE A <span>NORMIE</span>!</h1>
                                <p>The most competitive idle game ever! Gain rewards by challenging players in the PvP arena, climb the rankings to get improved idle rewards and summon heroes to build an undefeated team.</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <span className='image-container'>
                                <span className={merchant_class}></span>
                            </span>
                        </Col>
                    </Row>
                </div>
            </div>
            <nav id='navbar-bottom' className='shadow'>
                <span onClick={() => set_show_auth(true)} className='button border-light-shadow'>
                    <span>PLAY NOW!</span>
                </span>
            </nav>
            <Suspense fallback={<div>loading</div>}>
                <AuthModal show={show_auth} onHide={() => set_show_auth(false)}/>
            </Suspense>
        </Container>
    )
}

export default ViewLanding;
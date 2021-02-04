import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { login, signup,is_logged_in } from '../api/routes/auth';
import { save_user } from '../helper';
import {Container,Col, Row, Modal} from 'react-bootstrap';

const get_form_data = (e) => {
    let fd = new FormData(e.target);
    return {
        username: fd.get('username'),
        password: fd.get('password'),
    }
}

function AuthModal(props)
{
    const history = useHistory();
    const [show_signup,set_show_signup] = useState(true);
    const toggle_show_signup = () => set_show_signup(!show_signup);
    const handle_signup = (e) => {
        e.preventDefault();
        signup(get_form_data(e))
        .then(() => history.push('/home'))
        .catch(err => console.log(err));
    }
    const handle_login = (e) => {
        e.preventDefault();
        login(get_form_data(e))
        .then(res => {
            save_user(res);
            history.push('/home');
        })
        .catch(err => console.log(err));
    }
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className='border-light-shadow'>
          <div className='c-form'>
                {
                    show_signup ? <form onSubmit={handle_signup}>
                        <div>
                            <h3>Sign Up</h3>
                            <input className='reverse-border-light-shadow' type='text' name='username' placeholder='username'/>
                            <input className='reverse-border-light-shadow' type='password' name='password' placeholder='password'/>
                            <input className='button reverse-border-light-shadow' type='submit' value='Sign Up'/>
                            <span onClick={toggle_show_signup}>Already have an account?</span>
                        </div>
                    </form> : <form onSubmit={handle_login}>
                        <div>
                            <h3>Log In</h3>
                            <input className='reverse-border-light-shadow' type='text' name='username' placeholder='username'/>
                            <input className='reverse-border-light-shadow' type='password' name='password' placeholder='password'/>
                            <input className='button reverse-border-light-shadow' type='submit' value='Log In'/>
                            <span onClick={toggle_show_signup}>Don't have an account?</span>
                        </div>
                    </form>
                }
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default function ViewLanding (props)
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
        .catch(err => console.log(err));
        return function ()
        {
            clearTimeout(to_1);
            clearTimeout(to_2);
        }
    },[]);
    return <Container fluid>
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
        <AuthModal show={show_auth} onHide={() => set_show_auth(false)}/>
    </Container>
}
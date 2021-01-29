import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { login, signup,is_logged_in } from '../api/routes/auth';
import { save_user } from '../helper';
import {Container,Col, Row} from 'react-bootstrap';

const get_form_data = (e) => {
    let fd = new FormData(e.target);
    return {
        username: fd.get('username'),
        password: fd.get('password'),
    }
} 

export default function (props)
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
    useEffect(function(){
        is_logged_in()
        .then(() => history.push('/home'))
        .catch(err => console.log(err));
    },[]);
    return <Container fluid>
        <nav id='navbar-top' className='shadow'>
            <h5>AFK ASSAULT</h5>
            <div><span>PLAY NOW</span></div>
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
                            <img src={'/assets/merchant/icon.png'}/>
                        </span>
                        {/* <div className='c-form'>
                            {
                                show_signup ? <form onSubmit={handle_signup}>
                                    <input className='reverse-border-light-shadow' type='text' name='username' placeholder='username'/>
                                    <input className='reverse-border-light-shadow' type='password' name='password' placeholder='password'/>
                                    <input className='reverse-border-light-shadow' type='submit' value='Sign Up'/>
                                    <span onClick={toggle_show_signup}>Already have an account?</span>
                                </form> : <form onSubmit={handle_login}>
                                    <input className='reverse-border-light-shadow' type='text' name='username' placeholder='username'/>
                                    <input className='reverse-border-light-shadow' type='password' name='password' placeholder='password'/>
                                    <input className='reverse-border-light-shadow' type='submit' value='Log In'/>
                                    <span onClick={toggle_show_signup}>Don't have an account?</span>
                                </form>
                            }
                        </div> */}
                    </Col>
                </Row>
            </div>
        </div>
        <nav id='navbar-bottom' className='shadow'>
            <ul>
                <li><span className='icon arena-icon'></span>signup</li>
                <li>login</li>
            </ul>
        </nav>
    </Container>
}
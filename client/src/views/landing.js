import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { login, signup,is_logged_in } from '../api/routes/auth';
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
            props.set_user(res);
            history.push('/home');
        })
        .catch(err => console.log(err));
    }
    useEffect(function(){
        is_logged_in()
        .then(() => history.push('/home'))
        .catch(err => console.log(err));
    },[]);
    return <div className='pseudo-body'>
        {
            show_signup ? <form onSubmit={handle_signup}>
                <input type='text' name='username'/>
                <input type='password' name='password'/>
                <input type='submit' value='Sign Up'/>
                <span onClick={toggle_show_signup}>Already have an account?</span>
            </form> : <form onSubmit={handle_login}>
                <input type='text' name='username'/>
                <input type='password' name='password'/>
                <input type='submit' value='Log In'/>
                <span onClick={toggle_show_signup}>Don't have an account?</span>
            </form>
        }
    </div>
}
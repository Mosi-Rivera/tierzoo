import {useState} from 'react';
import { useHistory } from "react-router-dom";
import { save_user } from '../../helper';
import { login, signup } from '../../api/routes/auth';
import ModalBody    from 'react-bootstrap/ModalBody';
import Modal        from 'react-bootstrap/Modal';

const get_form_data = (e) => {
    let fd = new FormData(e.target);
    return {
        username: fd.get('username'),
        password: fd.get('password'),
    }
}

export default function AuthModal(props)
{
    const history = useHistory();
    const [show_signup,set_show_signup] = useState(true);
    const toggle_show_signup = () => set_show_signup(!show_signup);
    const handle_signup = (e) => {
        e.preventDefault();
        signup(get_form_data(e))
        .then(() => history.push('/home'))
        .catch(err => {});
    }
    const handle_login = (e) => {
        e.preventDefault();
        login(get_form_data(e))
        .then(res => {
            save_user(res);
            history.push('/home');
        })
        .catch(err => {});
    }
    return (<Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBody className='border-light-shadow'>
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
            </ModalBody>
        </Modal>
    );
  }
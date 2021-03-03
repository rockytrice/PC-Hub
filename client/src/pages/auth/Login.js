import React, {useState} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

import {Button} from 'antd';
import { MailOutlined } from '@ant-design/icons';

const Login = ({history}) => {
    //create state to store user's email
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    //handle form submit to firebase
    const handleSubmit = async (event)=>{
        event.preventDefault()
        setLoading(true);
        try{
         const result = await auth.signInWithEmailAndPassword(email, password);
        // console.log(result);
            const {user} = result
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                },
            });
            history.push('/')

        }catch (error){
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
    };
    const loginForm = ()=> (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" value={email}
                       placeholder="Enter your email address"
                       autoFocus
                       onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={password}
                       placeholder="Enter your password"
                       onChange={event => setPassword(event.target.value)}/>
            </div>

            <Button
                onClick={handleSubmit}
                type="primary"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
                className="mb-3">
                Login with Email/Password
            </Button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="b-0 my-2">Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    );
}

export default Login;
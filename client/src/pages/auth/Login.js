import React, {useEffect, useState} from 'react';
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {createUpdateUser} from "../../functions/auth";

import {Button} from 'antd';
import { MailOutlined , LoadingOutlined, GoogleOutlined } from '@ant-design/icons';



const Login = ({history}) => {
    //create state to store user's email
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    //destructure user from state using useSelector.. returns the state using spread operator to grab the user out of it.
    const {user} = useSelector((state) =>({...state}));
//this runs when the component mounts.. so if user and user token is already in the state, push to the home page
    useEffect(()=>{
        if(user && user.token){
            history.push("/")
        }
    },[user])

    const roleBasedRedirect = (res)=>{
        if(res.data.role === "admin"){
            history.push("admin/dashboard");
        }else{
            history.push("/user/history")
        }
    }
    let dispatch = useDispatch();
    //handle form submit to firebase
    const handleSubmit = async (event,err)=>{
        event.preventDefault()
        setLoading(true);
        try{
         const result = await auth.signInWithEmailAndPassword(email, password);
        // console.log(result);
            const {user} = result
            const idTokenResult = await user.getIdTokenResult();
            //gives us the user token
            createUpdateUser(idTokenResult.token)
                .then((res)=> {
                    dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                id: res.data.id
                            },
                        });
                    roleBasedRedirect(res);

                    }
                )
            .catch(err)

            // history.push('/')

        }catch (error){
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
    };
    const googleLogin = async ()=>{
    auth.signInWithPopup(googleAuthProvider)
        .then(async (result)=>{
            const {user} = result
            const idTokenResult = await user.getIdTokenResult();
            createUpdateUser(idTokenResult.token)
                .then((res)=> {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                id: res.data.id
                            },
                        });
                    roleBasedRedirect(res);
                    }
                )
                .catch();
            //history.push('/')

        })
        .catch((error)=>{
            console.log(error)
            toast.error(error.message)
        })

    }
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
            <div className="mt-4">
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
            </div>
           <div>
               <Button
                   onClick={googleLogin}
                   type="danger"
                   block
                   shape="round"
                   icon={<GoogleOutlined />}
                   size="large"
                   className="mb-3">
                   Login with Google
               </Button>
               <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
           </div>


        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <LoadingOutlined /> : <h4>Login</h4>}
                    {loginForm()}
                </div>
            </div>
        </div>
    );
}

export default Login;
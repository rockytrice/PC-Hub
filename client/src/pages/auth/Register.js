import React, {useEffect, useState} from 'react';
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {Button} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useSelector} from 'react-redux';

const Register = ({history}) => {
    //destructure user from state using useSelector.. returns the state using spread operator to grab the user out of it.
    const {user} = useSelector((state) =>({...state}));
//this runs when the component mounts.. so if user and user token is already in the state, push to the home page
    useEffect(()=>{
        if(user && user.token){
            history.push("/")
        }
    },[user])
    //create state to store user's email
    const [email, setEmail] = useState("");
    //handle form submit to firebase
    const handleSubmit = async (event)=>{
        event.preventDefault()
    //    when user submits form, we send them the url where they can complete the registration
        const config = {
            //url for redirect on register
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(email, config)
        //notify user that registration email has been sent
        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);
        //save users email in local storage
        window.localStorage.setItem('emailForRegistration', email);
        //clear state
        setEmail("");

    };
    const registerForm = ()=> (
        <form onSubmit={handleSubmit}>
            {/*bind the value in the state email. When user is typing in the input field,
            grab value and put it in the state by the name of the email variable. Then on change we get the event handler.
            So whenever the user types something in we set the email to the target value */}
            <div className="form-group">
                <input type="email" className="form-control" value={email}
                       placeholder="Enter the email address"
                       autoFocus
                       onChange={event => setEmail(event.target.value)}/>
            </div>
                   <Button onClick={handleSubmit}
                       type="primary"
                       block
                       shape="round"
                       icon={<UserAddOutlined />}
                       size="large"
                   >Register
                   </Button>
        </form>
    );
        return (
                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h4 className="b-0 my-2">Register</h4>
                            {registerForm()}
                        </div>
                    </div>
                </div>
            );
}

export default Register;
import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {Button} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import {createUpdateUser} from "../../functions/auth";

//destructor of history props
const RegisterComplete = ({history})  => {
    //create state to store user's email
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //destructure user from state using useSelector.. returns the state using spread operator to grab the user out of it.
    const {user} = useSelector((state) =>({...state}));
    let dispatch = useDispatch();
//this component mounts for the first time when the page loads. the first argument is the used state.
// and the second argument is the dependencies to control the behavior
    //when the component mounts the user's email will be available in the email state
    useEffect(()=>{
        //when the component mounts the user's email will be available in the email state
        setEmail(window.localStorage.getItem('emailForRegistration'))
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem('emailForRegistration'));
    },[])
    //handle form submit to firebase
    // access props.history
   // history.push('/das')


    const handleSubmit = async (event)=>{
        event.preventDefault()
        //validation
        if(!email || !password){
            toast.error('Email and password is required')
            return;
        }
        if(password.length < 6 ){
            toast.error("Password must be at least 6 characters")
            return;
        }

        //    when user submits form, we send them the url where they can complete the registration
try{
  const result = await auth.signInWithEmailLink(email,window.location.href)
if (result.user.emailVerified){
    //remove email from local storage
    window.localStorage.removeItem('emailForRegistration');
    //from firebase gets the currently logged in user
    let user = auth.currentUser
    //update user with the password
    await user.updatePassword(password);
    //get user id token
    const idTokenResult = await user.getIdToken();


    //redux store
    console.log("user",user, 'idTokenResult',idTokenResult)
      //dispatch to the store the currently logged in users info(email address, json web token, etc)

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
            }
        )
        .catch(err=> console.log(err));
    //redirect
    history.push('/')
}
} catch (error) {
            toast.error(error.message)
}

    };
    const completeRegistrationForm = ()=> (
        <form onSubmit={handleSubmit}>
            {/*bind the value in the state email. When user is typing in the input field,
            grab value and put it in the state by the name of the email variable. Then on change we get the event handler.
            So whenever the user types something in we set the email to the target value */}
            <input type="email" className="form-control" value={email}
                   disabled
                   />
            <input type="password"  className="form-control mt-3" value={password} onChange={(e)=> setPassword(e.target.value)}
                 placeholder="Password" autoFocus
            />
            <div className="mt-3">
                <Button onClick={handleSubmit}
                        type="primary"
                        block
                        shape="round"
                        icon={<UserAddOutlined />}
                        size="large"
                >Complete Registration
                </Button>
            </div>

        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="b-0 my-2">Complete Registration</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
}

export default RegisterComplete;